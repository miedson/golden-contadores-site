import { existsSync, readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

type GoogleBusinessReview = {
  comment?: string;
  createTime?: string;
  reviewId?: string;
  reviewReply?: {
    comment?: string;
    updateTime?: string;
  };
  reviewer?: {
    displayName?: string;
    profilePhotoUrl?: string;
  };
  starRating?: string;
  updateTime?: string;
};

type GoogleBusinessReviewsResponse = {
  averageRating?: number;
  nextPageToken?: string;
  reviews?: GoogleBusinessReview[];
  totalReviewCount?: number;
};

type StoredReview = {
  authorName: string;
  authorUrl: string;
  profilePhotoUrl: string;
  rating: number;
  relativePublishTimeDescription: string;
  text: string;
  translatedText?: string;
  publishTime?: string;
  languageCode?: string;
  ownerResponse?: string;
};

type ReviewsPayload = {
  source: string;
  placeName: string;
  rating: number;
  userRatingsTotal: number;
  fetchedAt: string;
  reviews: StoredReview[];
};

type OAuthTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

const GOOGLE_OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_BUSINESS_ACCOUNTS_URL = "https://mybusinessaccountmanagement.googleapis.com/v1/accounts";
const GOOGLE_BUSINESS_LOCATIONS_URL = "https://mybusinessbusinessinformation.googleapis.com/v1";
const GOOGLE_BUSINESS_REVIEWS_URL = "https://mybusiness.googleapis.com/v4";

const MAX_PAGE_SIZE = 50;
const projectRoot = process.cwd();

loadEnvFile(".env");
loadEnvFile(".env.local");

const outputFilePath = path.resolve(
  projectRoot,
  process.env.GOOGLE_REVIEWS_FILE_PATH || "data/google-reviews.json"
);

function loadEnvFile(fileName: string) {
  const filePath = path.resolve(projectRoot, fileName);

  if (!existsSync(filePath)) {
    return;
  }

  const content = readFileSync(filePath, "utf8");

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex < 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function parseTargetCount() {
  const rawValue = process.env.GOOGLE_REVIEWS_TARGET_COUNT;
  const parsedValue = rawValue ? Number.parseInt(rawValue, 10) : 24;

  if (Number.isNaN(parsedValue) || parsedValue <= 0) {
    return 24;
  }

  return Math.min(parsedValue, MAX_PAGE_SIZE);
}

function parseGoogleBusinessRating(starRating?: string) {
  switch (starRating) {
    case "ONE":
      return 1;
    case "TWO":
      return 2;
    case "THREE":
      return 3;
    case "FOUR":
      return 4;
    case "FIVE":
      return 5;
    default:
      return 5;
  }
}

function normalizeAverageRating(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0;
  }

  return Math.round(value * 10) / 10;
}

function toRelativePublishTimeDescription(dateValue?: string) {
  if (!dateValue) {
    return "";
  }

  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const diffMs = parsedDate.getTime() - Date.now();
  const diffMinutes = Math.round(diffMs / (1000 * 60));
  const absMinutes = Math.abs(diffMinutes);
  const formatter = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });

  if (absMinutes < 60) {
    return formatter.format(diffMinutes, "minute");
  }

  const diffHours = Math.round(diffMinutes / 60);

  if (Math.abs(diffHours) < 24) {
    return formatter.format(diffHours, "hour");
  }

  const diffDays = Math.round(diffHours / 24);

  if (Math.abs(diffDays) < 30) {
    return formatter.format(diffDays, "day");
  }

  const diffMonths = Math.round(diffDays / 30);

  if (Math.abs(diffMonths) < 12) {
    return formatter.format(diffMonths, "month");
  }

  const diffYears = Math.round(diffMonths / 12);
  return formatter.format(diffYears, "year");
}

function dedupeReviews(reviews: StoredReview[]) {
  const seen = new Set<string>();

  return reviews.filter((review) => {
    const key = `${review.authorName}::${review.publishTime ?? ""}::${review.text}`;

    if (!review.authorName || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function normalizeReviewText(text?: string) {
  return text?.trim() || "";
}

function splitTranslatedReviewText(text?: string) {
  const normalizedText = normalizeReviewText(text);

  if (!normalizedText) {
    return { text: "", translatedText: undefined };
  }

  const translatedByGoogleMarker = /\n\s*\(Translated by Google\)\s*\n/i;
  const originalMarker = /\n\s*\(Original\)\s*\n/i;

  if (translatedByGoogleMarker.test(normalizedText)) {
    const [originalText, translatedText] = normalizedText.split(translatedByGoogleMarker, 2);

    return {
      text: normalizeReviewText(originalText),
      translatedText: normalizeReviewText(translatedText) || undefined
    };
  }

  if (originalMarker.test(normalizedText)) {
    const [translatedText, originalText] = normalizedText.split(originalMarker, 2);

    return {
      text: normalizeReviewText(originalText),
      translatedText: normalizeReviewText(translatedText) || undefined
    };
  }

  return {
    text: normalizedText,
    translatedText: undefined
  };
}

async function fetchJson<T>(url: string, init: RequestInit) {
  const response = await fetch(url, init);
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Google API request failed (${response.status}): ${text}`);
  }

  return JSON.parse(text) as T;
}

async function getAccessToken() {
  const clientId = requireEnv("GOOGLE_BUSINESS_CLIENT_ID");
  const clientSecret = requireEnv("GOOGLE_BUSINESS_CLIENT_SECRET");
  const refreshToken = requireEnv("GOOGLE_BUSINESS_REFRESH_TOKEN");

  const response = await fetch(GOOGLE_OAUTH_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    })
  });

  const payload = (await response.json()) as OAuthTokenResponse;

  if (!response.ok || !payload.access_token) {
    const details = payload.error_description || payload.error || "Unknown OAuth error";
    throw new Error(`Failed to obtain Google OAuth access token: ${details}`);
  }

  return payload.access_token;
}

async function listAccounts(accessToken: string) {
  const response = await fetchJson<{ accounts?: Array<{ accountName?: string; name?: string }> }>(
    GOOGLE_BUSINESS_ACCOUNTS_URL,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  return response.accounts ?? [];
}

async function resolveAccountName(accessToken: string) {
  const explicitAccountName = process.env.GOOGLE_BUSINESS_ACCOUNT_NAME?.trim();

  if (explicitAccountName) {
    return explicitAccountName;
  }

  const explicitAccountId = process.env.GOOGLE_BUSINESS_ACCOUNT_ID?.trim();

  if (explicitAccountId) {
    return `accounts/${explicitAccountId}`;
  }

  const accounts = await listAccounts(accessToken);

  if (accounts.length === 1 && accounts[0]?.name) {
    return accounts[0].name;
  }

  throw new Error(
    "Unable to resolve Google Business account automatically. Define GOOGLE_BUSINESS_ACCOUNT_NAME or GOOGLE_BUSINESS_ACCOUNT_ID."
  );
}

async function resolveLocation(accessToken: string, accountName: string) {
  const explicitLocationName = process.env.GOOGLE_BUSINESS_LOCATION_NAME?.trim();
  const explicitLocationId = process.env.GOOGLE_BUSINESS_LOCATION_ID?.trim();
  const placeName = process.env.GOOGLE_PLACE_NAME?.trim();

  if (explicitLocationName) {
    return {
      locationName: explicitLocationName,
      placeName: placeName || explicitLocationName
    };
  }

  if (explicitLocationId) {
    return {
      locationName: `${accountName}/locations/${explicitLocationId}`,
      placeName: placeName || explicitLocationId
    };
  }

  const response = await fetchJson<{ locations?: Array<{ name?: string; title?: string }> }>(
    `${GOOGLE_BUSINESS_LOCATIONS_URL}/${accountName}/locations?pageSize=100&readMask=name,title`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  const locations = response.locations ?? [];

  if (locations.length === 1 && locations[0]?.name) {
    return {
      locationName: locations[0].name,
      placeName: placeName || locations[0].title || locations[0].name
    };
  }

  throw new Error(
    "Unable to resolve Google Business location automatically. Define GOOGLE_BUSINESS_LOCATION_NAME or GOOGLE_BUSINESS_LOCATION_ID."
  );
}

async function fetchReviews(accessToken: string, locationName: string, pageSize: number) {
  const params = new URLSearchParams({
    pageSize: String(pageSize),
    orderBy: "updateTime desc"
  });

  return fetchJson<GoogleBusinessReviewsResponse>(
    `${GOOGLE_BUSINESS_REVIEWS_URL}/${locationName}/reviews?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
}

function mapReview(review: GoogleBusinessReview): StoredReview {
  const publishTime = review.updateTime || review.createTime || "";
  const normalizedText = splitTranslatedReviewText(review.comment);

  return {
    authorName: review.reviewer?.displayName?.trim() || "Cliente Google",
    authorUrl: "",
    profilePhotoUrl: review.reviewer?.profilePhotoUrl?.trim() || "",
    rating: parseGoogleBusinessRating(review.starRating),
    relativePublishTimeDescription: toRelativePublishTimeDescription(publishTime),
    text: normalizedText.text,
    translatedText: normalizedText.translatedText,
    publishTime,
    languageCode: "pt-BR",
    ownerResponse: review.reviewReply?.comment?.trim() || undefined
  };
}

async function syncGoogleReviews() {
  const accessToken = await getAccessToken();
  const accountName = await resolveAccountName(accessToken);
  const location = await resolveLocation(accessToken, accountName);
  const reviewsResponse = await fetchReviews(accessToken, location.locationName, parseTargetCount());

  const reviews = dedupeReviews((reviewsResponse.reviews ?? []).map(mapReview));

  if (!reviews.length) {
    throw new Error("No reviews were returned by the Google Business Profile API.");
  }

  const payload: ReviewsPayload = {
    source: "google-business-profile-api",
    placeName: location.placeName,
    rating: normalizeAverageRating(reviewsResponse.averageRating),
    userRatingsTotal: reviewsResponse.totalReviewCount ?? reviews.length,
    fetchedAt: new Date().toISOString(),
    reviews
  };

  await mkdir(path.dirname(outputFilePath), { recursive: true });
  await writeFile(outputFilePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log(`Saved ${payload.reviews.length} reviews from Google Business Profile API to ${outputFilePath}`);
}

syncGoogleReviews().catch((error) => {
  console.error(error instanceof Error ? error.message : "Failed to sync Google reviews.");
  process.exit(1);
});

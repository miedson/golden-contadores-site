import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export type GoogleReview = {
  authorName: string;
  authorUrl: string;
  profilePhotoUrl: string;
  rating: number;
  relativePublishTimeDescription: string;
  text: string;
  translatedText?: string;
  publishTime?: string;
  languageCode?: string;
};

export type GoogleReviewsPayload = {
  source?: string;
  placeName?: string;
  rating: number;
  userRatingsTotal: number;
  fetchedAt?: string;
  reviews: GoogleReview[];
};

type SyncStatus = {
  status?: "running" | "success" | "failed";
  fetchedAt?: string;
  message?: string;
};

const projectRoot = process.cwd();
const runtimeFilePath = path.resolve(
  projectRoot,
  process.env.GOOGLE_REVIEWS_FILE_PATH || "data/google-reviews.json"
);
const syncStatusFilePath = path.resolve(
  path.dirname(runtimeFilePath),
  process.env.GOOGLE_REVIEWS_SYNC_STATUS_FILE_PATH || "google-reviews.sync-status.json"
);
const seedFilePath = path.resolve(projectRoot, "data/google-reviews.seed.json");

const fallbackPayload: GoogleReviewsPayload = {
  rating: 0,
  userRatingsTotal: 0,
  reviews: []
};

function readJsonFile<T = GoogleReviewsPayload | SyncStatus>(filePath: string) {
  if (!existsSync(filePath)) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as T;
  } catch {
    return null;
  }
}

function isValidGoogleReviewsPayload(payload: GoogleReviewsPayload | null): payload is GoogleReviewsPayload {
  if (!payload || payload.source !== "google-business-profile-api") {
    return false;
  }

  if (!payload.placeName || !payload.fetchedAt) {
    return false;
  }

  if (!Array.isArray(payload.reviews) || payload.reviews.length === 0) {
    return false;
  }

  return true;
}

export async function getGoogleReviews() {
  const runtimePayload = readJsonFile<GoogleReviewsPayload>(runtimeFilePath);

  if (isValidGoogleReviewsPayload(runtimePayload)) {
    return runtimePayload;
  }

  const syncStatus = readJsonFile<SyncStatus>(syncStatusFilePath);

  if (syncStatus?.status === "failed" || syncStatus?.status === "running" || !syncStatus) {
    return readJsonFile<GoogleReviewsPayload>(seedFilePath) ?? fallbackPayload;
  }

  return readJsonFile<GoogleReviewsPayload>(seedFilePath) ?? fallbackPayload;
}

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

const projectRoot = process.cwd();
const runtimeFilePath = path.resolve(
  projectRoot,
  process.env.GOOGLE_REVIEWS_FILE_PATH || "data/google-reviews.json"
);
const seedFilePath = path.resolve(projectRoot, "data/google-reviews.seed.json");

const fallbackPayload: GoogleReviewsPayload = {
  rating: 0,
  userRatingsTotal: 0,
  reviews: []
};

function readJsonFile(filePath: string) {
  if (!existsSync(filePath)) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as GoogleReviewsPayload;
  } catch {
    return null;
  }
}

export async function getGoogleReviews() {
  return readJsonFile(runtimeFilePath) ?? readJsonFile(seedFilePath) ?? fallbackPayload;
}

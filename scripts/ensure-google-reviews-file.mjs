import { copyFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const outputFilePath = path.resolve(
  projectRoot,
  process.env.GOOGLE_REVIEWS_FILE_PATH || "data/google-reviews.json"
);
const seedFilePath = path.resolve(projectRoot, "data/google-reviews.seed.json");

async function ensureGoogleReviewsFile() {
  if (existsSync(outputFilePath)) {
    console.log(`Google reviews file already exists at ${outputFilePath}`);
    return;
  }

  await mkdir(path.dirname(outputFilePath), { recursive: true });
  await copyFile(seedFilePath, outputFilePath);
  console.log(`Seeded Google reviews file at ${outputFilePath}`);
}

ensureGoogleReviewsFile().catch((error) => {
  console.error(error instanceof Error ? error.message : "Failed to ensure Google reviews file.");
  process.exit(1);
});


import https from "https";

import {
  FontValidationResult,
  GoogleFontsApiResponse,
  FontValidationSummary,
} from "../types";

/**
 * Validates a single Google Font family
 * @param familyName - The font family name to validate
 * @param apiKey - Google Fonts API key
 * @returns Promise resolving to validation result
 */
async function validateGoogleFont(
  familyName: string,
  apiKey: string
): Promise<FontValidationResult> {
  return new Promise((resolve) => {
    const encodedFamily = encodeURIComponent(familyName);
    const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&family=${encodedFamily}`;

    const req = https.get(url, (res) => {
      let data = "";

      res.on("data", (chunk: Buffer) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const response: GoogleFontsApiResponse = JSON.parse(data);

          if (
            res.statusCode === 200 &&
            response.items &&
            response.items.length > 0
          ) {
            resolve({ isValid: true, familyName });
          } else if (res.statusCode === 400) {
            resolve({
              isValid: false,
              familyName,
              error: "Invalid font family name",
            });
          } else {
            resolve({
              isValid: false,
              familyName,
              error: response.error?.message || "Font not found",
            });
          }
        } catch (err) {
          resolve({
            isValid: false,
            familyName,
            error: "Failed to parse API response",
          });
        }
      });
    });

    req.on("error", (err: Error) => {
      resolve({
        isValid: false,
        familyName,
        error: `Network error: ${err.message}`,
      });
    });

    // Set timeout for the request
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({ isValid: false, familyName, error: "Request timeout" });
    });
  });
}

/**
 * Validates multiple Google Font families
 * @param fontFamilies - Array of font family names
 * @param apiKey - Google Fonts API key (optional, reads from env if not provided)
 * @returns Promise resolving to validation summary
 */
export async function validateGoogleFonts(
  fontFamilies: string[],
  apiKey: string = process.env.GOOGLE_FONTS_API_KEY || ""
): Promise<FontValidationSummary> {
  if (!apiKey) {
    throw new Error(
      "Google Fonts API key is required. Set GOOGLE_FONTS_API_KEY environment variable or pass it as a parameter."
    );
  }

  if (!Array.isArray(fontFamilies) || fontFamilies.length === 0) {
    throw new Error("Font families must be a non-empty array");
  }

  console.log(
    `Validating ${fontFamilies.length} font${
      fontFamilies.length > 1 ? "s" : ""
    }...`
  );

  // Process fonts in batches to avoid overwhelming the API
  const batchSize = 5;
  const results: FontValidationResult[] = [];

  for (let i = 0; i < fontFamilies.length; i += batchSize) {
    const batch = fontFamilies.slice(i, i + batchSize);
    const batchPromises = batch.map((font) =>
      validateGoogleFont(font.trim(), apiKey)
    );
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    // Small delay between batches to be respectful to the API
    if (i + batchSize < fontFamilies.length) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  const valid = results.filter((r) => r.isValid).map((r) => r.familyName);
  const invalid = results
    .filter((r) => !r.isValid)
    .map((r) => ({
      familyName: r.familyName,
      error: r.error!,
    }));

  return { valid, invalid };
}

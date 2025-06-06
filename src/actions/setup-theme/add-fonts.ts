import enquirer from "enquirer";
import https from "https";
import path from "path";
import fs from "fs-extra";
import {
  FontValidationResult,
  GoogleFontsApiResponse,
  FontValidationSummary,
} from "./types";

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
async function validateGoogleFonts(
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

const updateIndex = async (
  projectName: string,
  fonts: string[],
  projectRoot: string
) => {
  const fontImportString = fonts
    .map((f) => `family=${f.replace(/ /g, "+")}&`)
    .join("");
  const indexPath = path.join(projectRoot, "index.html");

  try {
    // Read the existing HTML file
    const htmlContent = await fs.readFile(indexPath, "utf-8");

    let updatedHtml = htmlContent;

    // Replace existing title or add new one
    const titleRegex = /<title>.*?<\/title>/i;
    const newTitle = `<title>${projectName}</title>`;

    if (titleRegex.test(updatedHtml)) {
      // Replace existing title
      updatedHtml = updatedHtml.replace(titleRegex, newTitle);
    } else {
      // Add title if it doesn't exist (insert after opening <head> tag)
      const headOpenRegex = /<head[^>]*>/i;
      updatedHtml = updatedHtml.replace(
        headOpenRegex,
        (match) => `${match}\n    ${newTitle}`
      );
    }

    // Add new font links if fonts are provided
    if (fonts.length > 0) {
      const fontLinks = `
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?${fontImportString}display=swap" rel="stylesheet">`;

      // Insert before closing </head> tag
      const headCloseRegex = /<\/head>/i;
      if (headCloseRegex.test(updatedHtml)) {
        updatedHtml = updatedHtml.replace(
          headCloseRegex,
          `${fontLinks}\n  </head>`
        );
      } else {
        console.warn("No closing </head> tag found in HTML file");
      }
    }

    // Write the updated content back to the file
    await fs.writeFile(indexPath, updatedHtml, "utf-8");

    console.log(`Successfully updated ${indexPath}`);
  } catch (error) {
    console.error(`Error updating index.html: ${error}`);
    throw error;
  }
};

export const addFonts = async (projectName: string) => {
  const { prompt } = enquirer;
  const { fonts } = await prompt<{ fonts: string[] }>([
    {
      type: "list",
      name: "fonts",
      message:
        "Import Fonts: Enter any google font families you would like to import (comma separated if more than one). Press 'Enter' to skip:",
    },
  ]);

  // If no fonts were entered, skip to the next step
  if (fonts.length <= 0) {
    return "";
  } else {
    const { valid, invalid } = await validateGoogleFonts(
      fonts,
      process.env.GOOGLE_FONTS_API_KEY
    );

    // Notify user of any invalid fonts
    if (invalid.length > 0) {
      console.log(`\n❌ Invalid fonts (${invalid.length}), not installed:`);
      invalid.forEach(({ familyName, error }) => {
        console.log(`  • ${familyName}: ${error}`);
      });
    }

    let defaultFont = "";

    if (valid.length > 0) {
      // Notify user of successfully installed fonts
      console.log(`\n✅ Valid fonts (${valid.length}) installed:`);
      valid.forEach((font) => console.log(`  • ${font}`));

      // Allow user to set a default font for typography components
      const result = await prompt<{ defaultFont: string }>([
        {
          type: "select",
          name: "defaultFont",
          message: "Would you like to set one of these as the default font?",
          choices: [...valid], // need to destructure or 'valid' is changed into array of object
        },
      ]);
      defaultFont = result.defaultFont;
    }

    await updateIndex(projectName, valid, projectName);

    // returning this so we can use it in the theme
    return defaultFont;
  }
};

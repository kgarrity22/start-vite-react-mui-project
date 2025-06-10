import enquirer from "enquirer";
import path from "path";
import fs from "fs-extra";
import { validateGoogleFonts } from "./validate-fonts.js";
import { getApiKey } from "./handle-api-key/get-api-key.js";

/**
 * Updates index.html file to import google fonts & change project title
 * @param projectName - String name of project
 * @param fonts - Array of Google Font family names
 * @param projectRoot - Project directory location
 */
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

/**
 *
 * @param projectName - String name of project
 * @returns - String name of font family (if user sets one), otherwise undefined
 */
export const addFonts = async (
  projectName: string
): Promise<string | undefined> => {
  const { prompt } = enquirer;

  // Get API key for font validation
  const apiKey = await getApiKey();

  // If no API key, we skip font installation. Don't want users to try to install invalid fonts
  if (!apiKey) {
    console.log(
      "🚨 No API key provided. Skipping font installation. You can import fonts manually later. 🚨"
    );
    return undefined;
  }

  const { fonts } = await prompt<{ fonts: string[] }>([
    {
      type: "list",
      name: "fonts",
      message:
        "Enter any Google font family names you would like to import (comma separated if more than one):",
    },
  ]);

  // If no fonts were entered, skip to the next step
  if (fonts.length <= 0) {
    return "";
  } else {
    const { valid, invalid } = await validateGoogleFonts(fonts, apiKey);

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

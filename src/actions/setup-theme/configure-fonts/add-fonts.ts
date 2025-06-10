import enquirer from "enquirer";
import path from "path";
import fs from "fs-extra";
import { validateGoogleFonts } from "./validate-fonts";

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
 * 
 * Flow. Would you like to install google fonts? 
Y/n
If no —> skip 
If yes —> You need to provide a developer API key (see url).
Do you want to validate your fonts before attempting to import (recommended)? 
Please provide an Google Web developer API key to validate (see url)
—> if no value is provided —> No API key entered, font validation will be skipped.

Also want to add an interim step that handles the invalid fonts if they exist 
 */
export const addFonts = async (projectName: string) => {
  const { prompt } = enquirer;
  const { shouldInstallFonts } = await prompt<{
    shouldInstallFonts: boolean;
  }>({
    type: "confirm",
    name: "installFonts",
    message: "Would you like to install Google Fonts? (Y/N)",
  });
  if (!shouldInstallFonts) {
    console.log(
      "Skipping Google Font installing. You can import fonts manually at a later stage of project development."
    );
    return;
  }

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

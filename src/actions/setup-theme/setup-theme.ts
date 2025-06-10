import fs from "fs-extra";
import path from "path";
import enquirer from "enquirer";
import { addFonts } from "./configure-fonts/add-fonts.js";
import { addColorModeHook } from "./create-color-mode-toggle/add-color-mode-hook.js";
import { addColorModeToggle } from "./create-color-mode-toggle/add-color-mode-toggle.js";
import { addColorModeContext } from "./create-color-mode-toggle/add-color-mode-context.js";

const getCustomColors = async () => {
  const { prompt } = enquirer;
  const { primaryColor } = await prompt<{ primaryColor: string }>([
    {
      type: "input",
      name: "primaryColor",
      message:
        "Enter a color string if you would like to override the MUI PRIMARY color default (or press 'Enter' to skip):",
    },
  ]);
  const { secondaryColor } = await prompt<{ secondaryColor: string }>([
    {
      type: "input",
      name: "secondaryColor",
      message:
        "Enter a color string if you would like to override the MUI SECONDARY color default (or press 'Enter' to skip):",
    },
  ]);

  const primary = primaryColor ? { primary: { main: primaryColor } } : {};
  const secondary = secondaryColor
    ? { secondary: { main: secondaryColor } }
    : {};
  const customPalette = { ...primary, ...secondary };
  return customPalette;
};

// this is gonna get a lot bigger I think now
export async function setupTheme(projectRoot: string) {
  const themePath = path.join(projectRoot, "src", "theme", "theme.ts");

  const palette = await getCustomColors();
  const defaultFont = await addFonts(projectRoot);

  await addColorModeContext(projectRoot);
  await addColorModeHook(projectRoot);
  await addColorModeToggle(projectRoot);

  const paletteEntries = Object.entries(palette)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join(",\n          ");

  const themeContent = `
    import { createTheme, type PaletteMode } from '@mui/material';

    export const createCustomTheme = (mode: PaletteMode) =>
      createTheme({
        palette: {
          mode,
          ${paletteEntries ? paletteEntries + "," : ""}
        },
        ${defaultFont ? `typography: {fontFamily: "${defaultFont}"},` : ""}
    });
`;

  await fs.writeFile(themePath, themeContent);
}

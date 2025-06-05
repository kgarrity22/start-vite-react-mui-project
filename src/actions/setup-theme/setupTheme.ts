import fs from "fs-extra";
import path from "path";
import enquirer from "enquirer";
import { addFonts } from "./addFonts.js";

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

export async function setupTheme(projectRoot: string) {
  const themePath = path.join(projectRoot, "src", "theme.ts");

  // as the user for background color
  // (make all of these skippable instructions)
  // ask the user if they would like to add a light/dark theme toggle

  const palette = await getCustomColors();
  const defaultFont = await addFonts(projectRoot);

  const themeContent = `
import { ThemeProvider, createTheme, CssBaseline, useColorScheme } from '@mui/material';

export const theme = createTheme({
  ${Object.keys(palette).length > 0 ? `palette: ${palette},` : ""}
  ${defaultFont ? `typography: {fontFamily: ${defaultFont}},` : ""}
});
`;

  await fs.writeFile(themePath, themeContent);
}

import path from "path";
import fs from "fs-extra";

export const addColorModeContext = async (projectRoot: string) => {
  const filePath = path.join(
    projectRoot,
    "src",
    "theme",
    "color-mode-context.ts"
  );

  // File content
  const content = `
    import type { PaletteMode } from "@mui/material";
    import { createContext } from "react";

    // Define the context type
    type ColorModeContextType = {
        mode: PaletteMode;
        toggleColorMode: () => void;
    };
    // Create context with proper typing
    export const ColorModeContext = createContext<ColorModeContextType | undefined>(
        undefined
    );
  `;

  // Write to file
  await fs.writeFile(filePath, content);
};

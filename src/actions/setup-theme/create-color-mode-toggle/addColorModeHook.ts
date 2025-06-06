import path from "path";
import fs from "fs-extra";

export const addColorModeHook = async (projectRoot: string) => {
  const filePath = path.join(projectRoot, "src", "theme", "use-color-mode.ts");

  const content = `
        import { useContext } from "react";
        import { ColorModeContext } from "./color-mode-context";

        // Custom hook to use the color mode context
        export const useColorMode = () => {
        const context = useContext(ColorModeContext);
        if (context === undefined) {
            throw new Error("useColorMode must be used within a ColorModeProvider");
        }
        return context;
        };
    `;

  // Write to file
  await fs.writeFile(filePath, content);
};

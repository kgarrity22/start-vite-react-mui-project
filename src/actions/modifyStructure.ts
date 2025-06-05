import fs from "fs-extra";
import path from "path";
import { FILE_STRUCTURE } from "./constants.js";

/**
 * Modifies the structure of the project
 *
 *
 * @param projectRoot - The root of the project
 */
export async function modifyStructure(projectRoot: string) {
  const appPath = path.join(projectRoot, "src", "App.tsx");
  const appCssPath = path.join(projectRoot, "src", "App.css");
  const mainPath = path.join(projectRoot, "src", "main.tsx");

  // Remove App.tsx & App.css
  await fs.remove(appPath);
  await fs.remove(appCssPath);

  // Create structure inline with bulletproof-react approach
  for (const { dir, comment } of FILE_STRUCTURE) {
    const fullPath = path.join(projectRoot, dir);
    await fs.ensureDir(fullPath);

    const indexPath = path.join(fullPath, "index.ts");
    await fs.writeFile(indexPath, `// ${comment}\n`);
  }

  // Write custom main.tsx with Router
  const mainContent = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PaletteMode, ThemeProvider } from '@mui/material';
import Layout from './Layout';
import { theme } from './theme'; // todo: check this

const ToggleColorMode = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const colorMode = React.useMemo(
    () => ({
      // can implement a switch that invokes this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );
  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToggleColorMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </ToggleColorMode>
  </React.StrictMode>
);
  `;
  await fs.writeFile(mainPath, mainContent);
}

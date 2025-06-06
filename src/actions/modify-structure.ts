import fs from "fs-extra";
import path from "path";
import { FILE_STRUCTURE } from "./constants.js";

const updateEntryFile = async (projectRoot: string) => {
  const mainPath = path.join(projectRoot, "src", "main.tsx");
  // Write custom main.tsx with Router
  const mainContent = `
    import React from "react";
    import ReactDOM from "react-dom/client";
    import { BrowserRouter, Routes, Route } from "react-router-dom";
    import Layout from "./Layout";
    import { ColorModeProvider } from "./theme/color-mode-toggle";

    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <ColorModeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />} />
            </Routes>
          </BrowserRouter>
        </ColorModeProvider>
      </React.StrictMode>
    );
  `;
  // Write new structure to the file
  await fs.writeFile(mainPath, mainContent);
};

const addVercelConfig = async (projectRoot: string) => {
  const vercelPath = path.join(projectRoot, "vercel.json");
  const content = JSON.stringify({
    rewrites: [
      {
        source: "/(.*)",
        destination: "/",
      },
    ],
  });
  // Write to file
  await fs.writeFile(vercelPath, content);
};
/**
 * Modifies the structure of the project
 * @param projectRoot - The root of the project
 */
export async function modifyStructure(projectRoot: string) {
  const appPath = path.join(projectRoot, "src", "App.tsx");
  const appCssPath = path.join(projectRoot, "src", "App.css");

  // Remove App.tsx & App.css
  await fs.remove(appPath);
  await fs.remove(appCssPath);

  // Add vercel.json

  // Create structure inline with bulletproof-react approach
  for (const { dir, comment } of FILE_STRUCTURE) {
    const fullPath = path.join(projectRoot, dir);
    await fs.ensureDir(fullPath);

    const indexPath = path.join(fullPath, "index.ts");
    await fs.writeFile(indexPath, `// ${comment}\n`);
  }

  // Update main.tsx
  await updateEntryFile(projectRoot);
  // Add vercel config necessary for deployment
  await addVercelConfig(projectRoot);
}

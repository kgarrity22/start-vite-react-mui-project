import fs from "fs-extra";
import path from "path";
import { FILE_STRUCTURE } from "./constants";

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
import Layout from './Layout';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
  `;
  await fs.writeFile(mainPath, mainContent);
}

import fs from "fs-extra";
import path from "path";

export async function modifyStructure(projectRoot: string) {
  const appPath = path.join(projectRoot, "src", "App.tsx");
  const mainPath = path.join(projectRoot, "src", "main.tsx");

  // Remove App.tsx
  await fs.remove(appPath);

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

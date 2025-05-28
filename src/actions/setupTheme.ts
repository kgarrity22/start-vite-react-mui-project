import fs from "fs-extra";
import path from "path";

export async function setupTheme(projectRoot: string) {
  const layoutPath = path.join(projectRoot, "src", "Layout.tsx");

  const layoutContent = `
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}
`;

  await fs.writeFile(layoutPath, layoutContent);
}

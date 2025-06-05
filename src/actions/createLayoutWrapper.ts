import fs from "fs-extra";
import path from "path";

export async function createLayoutWrapper(projectRoot: string) {
  const layoutPath = path.join(projectRoot, "src", "Layout.tsx");

  const layoutContent = `
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Typography } from '@mui/material';

export default function Layout() {
  return (
    <Box>
      <CssBaseline />
      <Typography variant="h1">Hello World</Typography>
      <Outlet />
    </Box>
  );
}
`;

  await fs.writeFile(layoutPath, layoutContent);
}

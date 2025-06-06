import fs from "fs-extra";
import path from "path";

// Clears out the style defaults set by vite
export const clearStyles = async (projectRoot: string) => {
  const stylesPath = path.join(projectRoot, "src", "index.css");
  const stylesContent = `
    /* Add CSS styles here */
  `;
  // Write to file
  await fs.writeFile(stylesPath, stylesContent);
};

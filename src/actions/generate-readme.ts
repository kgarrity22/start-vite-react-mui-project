import fs from "fs-extra";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

/**
 * Generate a README.md file for the project
 * @param projectRoot - The path to the project
 * @param projectName - The name of the project
 * @param usesStorybook - Whether the project uses Storybook
 */
export function generateReadme(
  projectRoot: string,
  projectName: string,
  usesStorybook: boolean
) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // Use absolute path to template file within your package
  const templatePath = join(__dirname, "../templates/readme-template.md");
  const template = readFileSync(templatePath, "utf8");

  const output = template
    .replace(/{{projectName}}/g, projectName)
    .replace(/{{#if usesStorybook}}([\s\S]*?){{\/if}}/g, (_, content) =>
      usesStorybook ? content.trim() : ""
    );

  // Use join from path module instead of undefined path
  fs.writeFileSync(join(projectRoot, "README.md"), output);
}

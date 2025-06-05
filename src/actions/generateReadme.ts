import fs from "fs-extra";
import path from "path";

/**
 * Generate a README.md file for the project
 * TODO: need to check this fully before running
 *
 * @param projectPath - The path to the project
 * @param projectName - The name of the project
 * @param usesStorybook - Whether the project uses Storybook
 */
export function generateReadme(
  projectRoot: string,
  projectName: string,
  usesStorybook: boolean
) {
  const readmeTemplate = fs.readFileSync(
    path.join("templates", "readme-template.md"),
    "utf-8"
  );
  const output = readmeTemplate
    .replace(/{{projectName}}/g, projectName)
    .replace(/{{#if usesStorybook}}([\s\S]*?){{\/if}}/g, (_, content) =>
      usesStorybook ? content.trim() : ""
    );

  fs.writeFileSync(path.join(projectRoot, "README.md"), output);
}

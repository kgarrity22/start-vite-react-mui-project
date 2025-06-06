import enquirer from "enquirer";
import "dotenv/config";
import { Command } from "commander";
import { createProject } from "./actions/create-project.js";
import { installPackages } from "./actions/install-packages.js";
import { modifyStructure } from "./actions/modify-structure.js";
import { setupTheme } from "./actions/setup-theme/setup-theme.js";
import { generateReadme } from "./actions/generate-readme.js";
import { createLayoutWrapper } from "./actions/create-layout-wrapper.js";
import { clearStyles } from "./actions/clear-styles.js";

const program = new Command();
const { prompt } = enquirer;

program
  .name("start-vite-react-mui-project")
  .description("Bootstrap a custom Vite + React + TypeScript project with MUI")
  .action(async () => {
    const { name } = await prompt<{ name: string }>({
      type: "input",
      name: "name",
      message: "Project name:",
    });

    await createProject(name);
    const packages = await installPackages(name);
    generateReadme(name, name, packages.includes("storybook"));
    await modifyStructure(name);
    await clearStyles(name);
    await setupTheme(name);
    await createLayoutWrapper(name);

    console.log("✅ Project initialized!");
  });

program.parse();

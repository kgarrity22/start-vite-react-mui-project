import { Command } from "commander";
import enquirer from "enquirer";
import { createProject } from "./actions/createProject.js";
import { installPackages } from "./actions/installPackages.js";
import { modifyStructure } from "./actions/modifyStructure.js";
import { setupTheme } from "./actions/setupTheme.js";
import { generateReadme } from "./actions/generateReadme.js";

const program = new Command();
const { prompt } = enquirer;

program
  .name("startup-new-project")
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
    await setupTheme(name);

    console.log("✅ Project initialized!");
  });

program.parse();

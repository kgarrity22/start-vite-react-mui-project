import { Command } from "commander";
import { prompt } from "enquirer";
import { createProject } from "./actions/createProject.js";
import { installPackages } from "./actions/installPackages.js";
import { modifyStructure } from "./actions/modifyStructure.js";
import { setupTheme } from "./actions/setupTheme.js";

const program = new Command();

program
  .name("startup-new-project")
  .description("Bootstrap a custom Vite + React + TypeScript project")
  .action(async () => {
    const { name } = await prompt<{ name: string }>({
      type: "input",
      name: "name",
      message: "Project name:",
    });

    await createProject(name);
    await installPackages(name);
    await modifyStructure(name);
    await setupTheme(name);

    console.log("✅ Project initialized!");
  });

program.parse();

import { Command } from "commander";
import { prompt } from "enquirer";
import { createProject } from "./actions/createProject";
import { installPackages } from "./actions/installPackages";
import { modifyStructure } from "./actions/modifyStructure";
import { setupTheme } from "./actions/setupTheme";

const program = new Command();

program
  .name("startup-new-project")
  .description("Bootstrap a custom Vite + MUI + React Router project")
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

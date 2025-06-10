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
  .option(
    "--google-fonts-key <key>",
    "Google Fonts API key for font validation"
  )
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

// Help command to show users how to get started
program
  .command("help-fonts")
  .description("Show help for Google Fonts integration")
  .action(() => {
    console.log("\n🎨 Google Fonts Integration Help\n");
    console.log("To enable font validation and optimization:");
    console.log(
      "1. Get a free API key: https://developers.google.com/fonts/docs/developer_api"
    );
    console.log(
      "2. Add your key by either: \n      • Saving it as an environment variable: export GOOGLE_FONTS_API_KEY=your_key \n      • Set it with the command line flag: npx start-vite-react-mui-project --google-fonts-key your_key"
    );
    console.log(
      "3. Create projects normally - fonts will be validated automatically!"
    );
    console.log(
      "\n💡 Without an API key, font validation is skipped but projects still work!"
    );
  });

program.parse();

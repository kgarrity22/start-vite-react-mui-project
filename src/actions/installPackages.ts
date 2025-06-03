import { execa } from "execa";
import enquirer from "enquirer";
import { OPTIONAL_PACKAGES } from "./constants.js";
import { OptionalPackage } from "../types.js";

/**
 * Installs the necessary packages for the project
 *
 *
 * @param name - The name of the project
 */
export async function installPackages(name: string) {
  const packages = [
    "@mui/material",
    "@emotion/react",
    "@emotion/styled",
    "react-router-dom",
  ];

  // Get any optional packages
  const optionalPackages = await getOptionalPackages(OPTIONAL_PACKAGES);

  const finalPackages = [...packages, ...optionalPackages].filter(
    (p) => p !== "storybook"
  );

  await execa("yarn", ["add", ...finalPackages], {
    cwd: name,
    stdio: "inherit",
  });

  // Install Storybook --> separate from optional packages because uses 'create' instead of 'add'
  if (optionalPackages.includes("storybook")) {
    await execa("yarn", ["create", "storybook"], {
      cwd: name,
      stdio: "inherit",
    });
  }
}

/**
 * Helper for getting optional packages based on user prompts
 *
 * @param pkgs - The optional packages
 * @returns The optional packages to add via `yarn add`
 */
async function getOptionalPackages(pkgs: OptionalPackage[]) {
  const optionalPackages = [];
  const { prompt } = enquirer;
  // For each optional package, confirm if the user wants to install it
  for (const pkg of pkgs) {
    const { usePackage } = await prompt<{ usePackage: boolean }>({
      type: "confirm",
      name: pkg.package,
      message: `Would you like to install ${pkg.name}?`,
      initial: false,
    });

    if (usePackage) {
      optionalPackages.push(pkg.package);
    }
  }
  return optionalPackages;
}

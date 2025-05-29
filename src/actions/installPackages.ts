import { execa } from "execa";
import { prompt } from "enquirer";
import { OPTIONAL_PACKAGES } from "./constants";
import { OptionalPackage } from "../types";

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

  const finalPackages = [...packages, ...optionalPackages];

  await execa("yarn", ["add", ...finalPackages], {
    cwd: name,
    stdio: "inherit",
  });
}

async function getOptionalPackages(pkgs: OptionalPackage[]) {
  const optionalPackages = [];

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

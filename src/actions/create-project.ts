import { execa } from "execa";

/**
 * Initializes a new project with vite and react-ts
 *
 * @param name - The name of the project
 */
export async function createProject(name: string) {
  await execa("yarn", ["create", "vite", name, "--template", "react-ts"], {
    stdio: "inherit",
  });
}

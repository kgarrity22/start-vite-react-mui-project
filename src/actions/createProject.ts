import { execa } from "execa";

export async function createProject(name: string) {
  await execa("yarn", ["create", "vite", name, "--template", "react-ts"], {
    stdio: "inherit",
  });
}

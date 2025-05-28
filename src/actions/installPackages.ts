import { execa } from "execa";

export async function installPackages(name: string) {
  const packages = [
    "@mui/material",
    "@emotion/react",
    "@emotion/styled",
    "react-router-dom",
  ];

  await execa("yarn", ["add", ...packages], { cwd: name, stdio: "inherit" });
}

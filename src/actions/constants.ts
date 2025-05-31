import { OptionalPackage } from "../types.js";

// Bulletproof structure for a React project (https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)
export const FILE_STRUCTURE = [
  { dir: "src/app/routes", comment: "application routes / can also be pages" },
  {
    dir: "src/app",
    comment: "application layer containing main entry components",
  },
  {
    dir: "src/assets",
    comment:
      "assets folder can contain all the static files such as images, fonts, etc.",
  },
  {
    dir: "src/components",
    comment: "shared components used across the entire application",
  },
  {
    dir: "src/config",
    comment: "global configurations, exported env variables etc.",
  },
  {
    dir: "src/features/example-feature/api",
    comment:
      "exported API request declarations and api hooks related to a specific feature",
  },
  {
    dir: "src/features/example-feature/assets",
    comment:
      "assets folder can contain all the static files for a specific feature",
  },
  {
    dir: "src/features/example-feature/components",
    comment: "components scoped to a specific feature",
  },
  {
    dir: "src/features/example-feature/hooks",
    comment: "hooks scoped to a specific feature",
  },
  {
    dir: "src/features/example-feature/stores",
    comment: "state stores for a specific feature",
  },
  {
    dir: "src/features/example-feature/types",
    comment: "typescript types used within the feature",
  },
  {
    dir: "src/features/example-feature/utils",
    comment: "utility functions for a specific feature",
  },
  {
    dir: "src/hooks",
    comment: "shared hooks used across the entire application",
  },
  {
    dir: "src/lib",
    comment: "reusable libraries preconfigured for the application",
  },
  { dir: "src/stores", comment: "global state stores" },
  { dir: "src/testing", comment: "test utilities and mocks" },
  { dir: "src/types", comment: "shared types used across the application" },
  { dir: "src/utils", comment: "shared utility functions" },
];

export const OPTIONAL_PACKAGES: OptionalPackage[] = [
  {
    name: "Storybook",
    description: "Storybook for component development",
    package: "storybook",
  },
];

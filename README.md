# 🛠️ Create Vite/React/MUI Project CLI

A customizable command-line tool that scaffolds a modern React + Vite project with pre-installed libraries and opinionated project structure.

## 🚀 What It Does

This CLI helps you:

- Scaffold a new React + TypeScript project using Vite
- Automatically install dependencies like:
  - Material UI
  - React Router
- Set up a custom project file structure:
  - `main.tsx` handles routing
  - Adds a `Layout.tsx` component with shared styling and `<Outlet />`
- Optionally apply a default MUI theme and theme provider
- Prompt you for configuration during setup

## 🧪 Getting Started (Development)

```bash
# Clone the repo and install dependencies
git clone https://github.com/kgarrity22/cli-tool.git
cd cli-tool
yarn install

# Run the CLI in dev mode
yarn dev
```

## 📦 Build the CLI

```bash
yarn build
```

## 🛠️ Usage (Planned)

Eventually, you’ll be able to run:

```bash
yarn create start-new-project
```

Or globally:

```bash
npx start-new-project
```

And go through a series of prompts to generate a ready-to-code project.

## 📁 Project Structure (WIP)

```
cli-tool/
├── bin/
│   └── index.js            # Entry point
├── templates/
│   └── base-template/      # Custom Vite project template (optional)
├── src/
│   ├── cli.ts              # Commander + Enquirer setup
│   ├── actions/
│   │   ├── createProject.ts   # Runs `yarn create vite`
│   │   ├── installPackages.ts
│   │   ├── modifyStructure.ts
│   │   └── setupTheme.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 📋 TODO

- [ ] Add prompts for project customization
- [ ] Generate custom file structure
- [ ] Add MUI theme and provider logic
- [ ] Publish as an installable CLI

## 🤝 Contributing

If you’d like to contribute, feel free to fork this repo and submit a pull request!

---

Made with ☕ and TypeScript by [kgarrity22](https://github.com/kgarrity22)

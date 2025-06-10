# 🛠️ Create Vite/React/MUI Project CLI

A customizable command-line tool that scaffolds a modern React + Vite project with pre-installed libraries and opinionated project structure.

## ℹ️ About
I'm a big fan of using vite when I create web apps, but I also have found myself repeating a series of steps to get the project configuration exactly the way I want it each time. I built this CLI tool to automate those few extra set up steps in the hopes of streamlining my project creation process by automatically installing packages, scaffolding the app's file structure, defining fonts, and establishing some baseline themeing. This makes it quick and easy for me to start a new project with my go to front-end tech stack (React, MUI (component library), bulletproof react (for file structure guidelines), Google Fonts).

## 👉 How to Use

### Before you run
#### Google Fonts Integration (Optional)

To enable Google Fonts optimization, you can provide an API key in a couple ways:

1. **Environment variable**: `export GOOGLE_FONTS_API_KEY=your_key`
2. **Command line**: `npx start-vite-react-mui-project --google-fonts-key your_key`

Get a free API key at: https://developers.google.com/fonts/docs/developer_api

### Running
Run
```
npx start-vite-react-mui-project
```
and follow the prompts to get the project started

## 🚀 What It Does

This CLI helps you:

- Scaffold a new React + TypeScript project using Vite
- Automatically install dependencies like:
  - Material UI
  - React Router
  - Storybook
- Set up a custom project file structure:
  - `main.tsx` handles routing
  - Adds a `Layout.tsx` component for shared styling across routes
- Optionally install Google Fonts 
- Optionally apply custom MUI theme colors & default font style
- Build in dark/light mode toggling capabilities

## 🧪 Getting Started (Development)

### Google Fonts Integration 
For running locally, you'll need to get a Google Fonts API key ([see more on this here](https://developers.google.com/fonts/docs/developer_api)) and store in in a .env file as `GOOGLE_FONTS_API_KEY`
See [above section](#google-fonts-integration-optional) on Google Fonts integration for more information on other ways to store and use your API key.

### Local Development
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

## 🛠️ Usage

```bash
yarn create start-new-project
```

And go through a series of prompts to generate a ready-to-code project.

## 📁 Project Structure (WIP)

```
cli-tool/
├── bin/
│   └── index.js            # Entry point
├── src/
│   ├── cli.ts              # Commander + Enquirer setup
│   ├── templates/          # Mostly static reusable files
│   ├── actions/
│   │   ├── setup-theme/    # MUI theme configuration, font installation, color mode toggle logic
│   │   │    ├── create-color-mode-toggle/   
│   │   │    │    ├── add-color-mode-context.ts       
│   │   │    │    ├── add-color-mode-hook.ts    
│   │   │    │    └── add-color-mode-toggle.ts   
│   │   │    ├── configure-fonts/   # Handles adding Google Fonts & setting up Google Font API key to validate fonts existence
│   │   │    │    ├── add-fonts.ts  
│   │   │    │    ├── validate-fonts.ts
│   │   │    │    └── handle-api-key/          
│   │   │    ├── setup-theme.ts    # Puts all theme set-up (colors, fonts, etc.) together
│   │   │    └── types.ts   
│   │   ├── clear-styles.ts
│   │   ├── constants.ts
│   │   ├── create-layout-wrapper.ts
│   │   ├── create-project.ts   # Runs `yarn create vite`
│   │   ├── generate-readme.ts
│   │   ├── install-packages.ts
│   │   └── modify-structure.ts
├── tests/
│   └──  test-project/          # Example project created by `yarn start-vite-react-mui-project`
├── package.json
├── tsconfig.json
└── README.md
```

## 📋 For Future Iterations

- [ ] Make light/dark toggle mode code optional
- [ ] Enable optional creation of a top nav bar
- [ ] Options for installing other component libraries/style systems in place of MUI
- [ ] Extend to other other vite-allowed (Vue/Svelte/Vanilla etc.)
- [ ] Set Google Fonts key via global config
- [ ] Automated Tests

## 🤝 Contributing

If you’d like to contribute, feel free to fork this repo and submit a pull request!


## ✉️ Acknowledgements

A big shout out to the following tools & sources that made this project possible:
- [MUI](https://mui.com/material-ui/)/[Material design](https://m3.material.io/)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md) for informing file structure
- [Google Fonts](https://fonts.google.com/) and the [Google Fonts API](https://developers.google.com/fonts/docs/developer_api)
- And of course [vite](https://vite.dev/)

---

Made with ☕ and TypeScript by [kgarrity22](https://github.com/kgarrity22)

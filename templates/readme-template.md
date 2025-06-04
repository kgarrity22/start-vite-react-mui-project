# 🚀 {{projectName}}

Generated with [`create-startup-project`](https://github.com/kgarrity22/create-startup-project) — a CLI tool for bootstrapping production-ready React + Vite apps with a clean, scalable architecture.

---

## 📁 Project Structure

```
src
├── app              # Application layer (routes, providers, entrypoints)
├── assets           # Global static assets (images, fonts, etc.)
├── components       # Shared UI components used across the app
├── config           # App-level config and environment variables
├── features         # Feature-based modules (each with scoped logic)
├── hooks            # Shared React hooks
├── lib              # Preconfigured libraries/utilities
├── stores           # Global state management (e.g., Zustand, Jotai)
├── testing          # Utilities and mocks for testing
├── types            # Shared TypeScript types
└── utils            # General-purpose utilities
```

Each feature folder follows this structure:
```
features/awesome-feature
├── api
├── assets
├── components
├── hooks
├── stores
├── types
└── utils
```

---

## 🛠️ Scripts

```bash
# Start local dev server
yarn dev

# Type-check code
yarn typecheck

# Run tests
yarn test

# Build for production
yarn build
```

{{#if usesStorybook}}

---

## 📚 Storybook

This project was scaffolded with Storybook support.

```bash
# Start Storybook
yarn storybook

# Build static Storybook
yarn build-storybook
```

Storybook helps visualize components in isolation. You’ll find example stories in `src/components/Button/Button.stories.tsx`.

{{/if}}

---

## 📦 Dependencies

Built with:

- [Vite](https://vitejs.dev)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

{{#if usesStorybook}}
- [Storybook](https://storybook.js.org/)
{{/if}}

---

## 📄 License

MIT

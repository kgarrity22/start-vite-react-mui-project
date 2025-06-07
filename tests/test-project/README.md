# 🚀 test-project

Generated with [`start-vite-react-mui-project`](https://github.com/kgarrity22/create-start-project) — a CLI tool for bootstrapping production-ready React + Vite apps with a clean, scalable architecture.


<img width="400" alt="Screen Shot 2025-06-06 at 3 27 33 PM" src="https://github.com/user-attachments/assets/e89f8198-8d42-4a2c-80ca-bd4faeb9f5b4" />

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



---

## 📦 Dependencies

Built with:

- [Vite](https://vitejs.dev)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Material UI](https://mui.com/material-ui)



---

## 📄 License

MIT

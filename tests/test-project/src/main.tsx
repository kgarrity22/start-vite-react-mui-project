
    import React from "react";
    import ReactDOM from "react-dom/client";
    import { BrowserRouter, Routes, Route } from "react-router-dom";
    import Layout from "./Layout";
    import { ColorModeProvider } from "./theme/color-mode-toggle";

    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <ColorModeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />} />
            </Routes>
          </BrowserRouter>
        </ColorModeProvider>
      </React.StrictMode>
    );
  
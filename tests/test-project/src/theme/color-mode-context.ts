
    import type { PaletteMode } from "@mui/material";
    import { createContext } from "react";

    // Define the context type
    type ColorModeContextType = {
        mode: PaletteMode;
        toggleColorMode: () => void;
    };
    // Create context with proper typing
    export const ColorModeContext = createContext<ColorModeContextType | undefined>(
        undefined
    );
  
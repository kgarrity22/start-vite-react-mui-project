
    // Enables ability to toggle between light & dark modes
    import { ThemeProvider, type PaletteMode } from "@mui/material";
    import { useMemo, useState, useEffect, type ReactNode } from "react";
    import { ColorModeContext } from "./color-mode-context";
    import { createCustomTheme } from "./theme";

    // Get initial mode from localStorage or system preference
    const getInitialMode = (): PaletteMode => {
        // Check localStorage first
        const savedMode = localStorage.getItem("colorMode") as PaletteMode | null;
        if (savedMode === "light" || savedMode === "dark") {
        return savedMode;
        }

        // Fall back to system preference
        if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        }

        return "light";
    };

    export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
        const [mode, setMode] = useState<PaletteMode>(getInitialMode);

        // Persist mode changes to localStorage
        useEffect(() => {
        localStorage.setItem("colorMode", mode);
        }, [mode]);

        const colorMode = useMemo(
        () => ({
            mode,
            toggleColorMode: () => {
            setMode((prevMode: PaletteMode) =>
                prevMode === "light" ? "dark" : "light"
            );
            },
        }),
        [mode]
        );

        // Create theme based on current mode - MUI handles defaults automatically
        const theme = useMemo(() => createCustomTheme(mode), [mode]);

        return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
        );
    };

    // Example usage in a component:
    /*
    import { useColorMode } from './theme-mode-toggle';
    import { IconButton } from '@mui/material';
    import { Brightness4, Brightness7 } from '@mui/icons-material';

    export const ThemeToggleButton = () => {
        const { mode, toggleColorMode } = useColorMode();
        
        return (
        <IconButton onClick={toggleColorMode} color="inherit">
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        );
    };
    */
  
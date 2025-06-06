
        import { useContext } from "react";
        import { ColorModeContext } from "./color-mode-context";

        // Custom hook to use the color mode context
        export const useColorMode = () => {
        const context = useContext(ColorModeContext);
        if (context === undefined) {
            throw new Error("useColorMode must be used within a ColorModeProvider");
        }
        return context;
        };
    
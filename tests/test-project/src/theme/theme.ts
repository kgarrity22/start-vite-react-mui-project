
    import { createTheme, type PaletteMode } from '@mui/material';

    export const createCustomTheme = (mode: PaletteMode) =>
      createTheme({
        palette: {
          mode,
          primary: {"main":"#38a3a5"},
          secondary: {"main":"#c7f9cc"},
        },
        typography: {fontFamily: "Kablammo"},
    });

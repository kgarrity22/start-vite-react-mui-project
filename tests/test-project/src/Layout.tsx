
    import { Outlet } from 'react-router-dom';
    import { Box, CssBaseline, Typography, useTheme } from '@mui/material';


    export default function Layout() {
      const theme = useTheme();
      return (
        <Box
          sx={{
            height: "100vh",
            background: theme.palette.primary.main,
            color: theme.palette.secondary.main,
          }}
        >
          <CssBaseline />
          <Typography variant="h1">Hello World</Typography>
          <Typography variant="h2">Hey!</Typography>
          <Outlet />
        </Box>
      );
    }

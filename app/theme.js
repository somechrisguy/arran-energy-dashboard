// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00A3FF",
    },
    secondary: {
      main: "#53FFCB",
    },
    background: {
      default: "#0B0C2A",
      paper: "#1E1F3E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    fontSize: 14,
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1F3E",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1F3E",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1F3E",
        },
      },
    },
  },
});

export default theme;

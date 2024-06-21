import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
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
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    fontSize: 14,
    h5: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
  },
});

export default theme;

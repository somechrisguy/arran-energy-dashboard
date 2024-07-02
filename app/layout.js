// app/layout.js
"use client";
import { AppBar, Container, CssBaseline } from "@mui/material";
import Header from "./components/Header";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="relative">
            <Header />
          </AppBar>
          <Container sx={{ mt: 4 }}>
            <main>{children}</main>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}

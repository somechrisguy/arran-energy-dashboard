// app/components/Header.js
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import Link from "next/link";

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "background.paper" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "text.primary", lineHeight: 1.2 }}
        >
          Isle of Arran - Energy Use & Generation Dashboard
        </Typography>
        <Box>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/about">
            About
          </Button>
          <Button color="inherit" component={Link} href="/partners">
            Partners
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

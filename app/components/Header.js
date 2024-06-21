import { AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material";

function Header({ view, handleViewChange }) {
  return (
    <AppBar position="static" sx={{ backgroundColor: "background.default" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "text.primary" }}
        >
          EnergyDashboard
        </Typography>
        <Tabs
          value={view}
          onChange={handleViewChange}
          aria-label="chart tabs"
          sx={{ "& .MuiTab-root": { color: "text.primary" } }}
        >
          <Tab label="Current" value="current" />
          <Tab label="Projection" value="projection" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

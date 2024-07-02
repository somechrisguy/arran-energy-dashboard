// app/components/ChartTabsPanel.js
"use client";
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export function ChartTabsPanel({ children, title, view }) {
  return (
    <Paper
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {view === "current" ? children[0] : children[1]}
      </Box>
    </Paper>
  );
}

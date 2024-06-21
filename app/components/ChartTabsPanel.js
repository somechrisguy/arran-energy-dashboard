"use client";
import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";

export function ChartTabsPanel({ children, title, view, handleViewChange }) {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "background.paper",
        borderRadius: "4px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          variant="h5"
          sx={{ color: "text.primary", padding: "20px" }}
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ padding: "20px" }}>
        {view === "current" ? children[0] : children[1]}{" "}
      </Box>
    </Box>
  );
}

// app/page.js
"use client";
import { useState } from "react";
import { Grid, Tabs, Tab, Box } from "@mui/material";
import { ChartTabsPanel } from "./components/ChartTabsPanel";
import Head from "next/head";

// Define color palette
export const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#a4de6c",
  "#d0ed57",
  "#83a6ed",
  "#8dd1e1",
  "#e8c3b9",
  "#c45850",
];

// Define common chart styles
export const chartStyles = {
  fontSize: 12,
  fontFamily: "Arial, sans-serif",
  fill: "#FFFFFF",
  stroke: "#FFFFFF",
  color: "#FFFFFF",
};

export default function Home() {
  const [view, setView] = useState("current");

  const handleViewChange = (event, newValue) => {
    setView(newValue);
  };

  return (
    <>
      <Head>
        <title>REPID Dashboard</title>
      </Head>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs
          value={view}
          onChange={handleViewChange}
          aria-label="dashboard view"
        >
          <Tab label="2023" value="current" />
          <Tab label="Projection" value="projection" />
        </Tabs>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ChartTabsPanel
            title="Energy Usage"
            view={view}
            csvFile="/data/2b.csv"
            unit="kWh/yr"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartTabsPanel
            title="Energy Generation"
            view={view}
            csvFile="/data/5Ab.csv"
            unit="kWh/yr"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartTabsPanel
            title="EPC Grades"
            view={view}
            csvFile="/data/1Bb.csv"
            unit=" houses"
            chartType="area"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartTabsPanel
            title="Main Heating Options"
            view={view}
            csvFile="/data/1Cb.csv"
            unit=" houses"
            chartType="area"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartTabsPanel
            title="Predicted Savings"
            view={view}
            csvFile="/data/3Ab.csv"
            prefixUnit="£"
            unit="/yr"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartTabsPanel
            title="Actual Savings"
            view={view}
            csvFile="/data/4Ab.csv"
            prefixUnit="£"
            unit="/year"
          />
        </Grid>
      </Grid>
    </>
  );
}

// app/page.js
"use client";
import { useState } from "react";
import { Grid, Tabs, Tab, Box } from "@mui/material";
import { ChartTabsPanel } from "./components/ChartTabsPanel";
import CSVPieChart from "./components/csvPieChart";
import CSVBarChart from "./components/barChart";
import StackedAreaChart from "./components/stackedAreaChart";
import StackedBarChart from "./components/stackedBarChart";
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
        <Grid item xs={12} md={4}>
          <ChartTabsPanel title="General info" view={view}>
            <CSVPieChart csvFile="./data/1Aa.csv" />
            <StackedAreaChart csvFile="./data/1Ab.csv" />
          </ChartTabsPanel>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartTabsPanel title="EPC Grades (number of houses)" view={view}>
            <CSVPieChart csvFile="./data/1Ba.csv" />
            <StackedAreaChart csvFile="./data/1Bb.csv" />
          </ChartTabsPanel>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartTabsPanel
            title="Main heating options (number of houses)"
            view={view}
          >
            <CSVPieChart csvFile="./data/1Ca.csv" />
            <StackedAreaChart csvFile="./data/1Cb.csv" />
          </ChartTabsPanel>
        </Grid>
        <Grid item xs={12}>
          <ChartTabsPanel title="Usage (kw/h)" view={view}>
            <CSVBarChart csvFile="./data/2a.csv" />
            <StackedBarChart csvFile="./data/2b.csv" />
          </ChartTabsPanel>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartTabsPanel title="Savings Predictions (£/year)" view={view}>
            <CSVPieChart csvFile="./data/3Aa.csv" />
            <StackedBarChart csvFile="./data/3Ab.csv" />
          </ChartTabsPanel>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartTabsPanel title="Savings - actual (£/year)" view={view}>
            <CSVPieChart csvFile="./data/4Aa.csv" />
            <StackedBarChart csvFile="./data/4Ab.csv" />
          </ChartTabsPanel>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartTabsPanel title="Energy Generated (kw/year)" view={view}>
            <CSVPieChart csvFile="./data/5Aa.csv" />
            <StackedBarChart csvFile="./data/5Ab.csv" />
          </ChartTabsPanel>
        </Grid>
      </Grid>
    </>
  );
}

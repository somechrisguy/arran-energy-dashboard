// app/page.js
"use client";
import { useState } from "react";
import { Grid, Tabs, Tab, Box } from "@mui/material";
import { ChartTabsPanel } from "./components/ChartTabsPanel";
import CSVDonutChart from "./components/csvDonutChart";
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
        <Grid item xs={12} md={6}>
          <ChartTabsPanel title="Energy Usage" view={view}>
            <CSVDonutChart csvFile="./data/2a.csv" unit="kWh/yr" />
            <StackedBarChart csvFile="./data/2b.csv" />
          </ChartTabsPanel>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartTabsPanel title="Energy Generation" view={view}>
            <CSVDonutChart csvFile="./data/5Aa.csv" unit="kWh/yr" />
            <StackedBarChart csvFile="./data/5Ab.csv" />
          </ChartTabsPanel>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartTabsPanel title="EPC Grades" view={view}>
            <CSVDonutChart csvFile="./data/1Ba.csv" unit=" houses" />
            <StackedAreaChart csvFile="./data/1Bb.csv" />
          </ChartTabsPanel>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartTabsPanel title="Main Heating Options" view={view}>
            <CSVDonutChart csvFile="./data/1Ca.csv" unit=" houses" />
            <StackedAreaChart csvFile="./data/1Cb.csv" />
          </ChartTabsPanel>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartTabsPanel title="Predicted Savings" view={view}>
            <CSVDonutChart csvFile="./data/3Aa.csv" prefixUnit="£" unit="/yr" />
            <StackedBarChart csvFile="./data/3Ab.csv" />
          </ChartTabsPanel>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartTabsPanel title="Actual Savings" view={view}>
            <CSVDonutChart
              csvFile="./data/4Aa.csv"
              prefixUnit="£"
              unit="/year"
            />
            <StackedBarChart csvFile="./data/4Ab.csv" />
          </ChartTabsPanel>
        </Grid>
      </Grid>
    </>
  );
}

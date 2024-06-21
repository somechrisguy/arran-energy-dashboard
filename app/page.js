"use client";
import { Grid, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { ChartTabsPanel } from "./components/ChartTabsPanel";
import CSVPieChart from "./components/csvPieChart";
import StackedAreaChart from "./components/stackedAreaChart";
import StackedBarChart from "./components/stackedBarChart";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Header from "./components/Header";

export default function Home() {
  const [view, setView] = useState("current");
  const handleViewChange = (newValue) => {
    console.log(newValue);
    setView(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header view={view} handleViewChange={handleViewChange} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ChartTabsPanel
            title="General info"
            view={view}
            handleViewChange={handleViewChange}
          >
            <CSVPieChart csvFile="./data/1Aa.csv" />
            <StackedAreaChart csvFile="./data/1Ab.csv" />
          </ChartTabsPanel>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartTabsPanel
            title="EPC Grades"
            view={view}
            handleViewChange={handleViewChange}
          >
            <CSVPieChart csvFile="./data/1Ba.csv" />
            <StackedAreaChart csvFile="./data/1Bb.csv" />
          </ChartTabsPanel>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartTabsPanel
            title="Main heating options"
            view={view}
            handleViewChange={handleViewChange}
          >
            <CSVPieChart csvFile="./data/1Ca.csv" />
            <StackedAreaChart csvFile="./data/1Cb.csv" />
          </ChartTabsPanel>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartTabsPanel
            title="Usage (kw/h)"
            view={view}
            handleViewChange={handleViewChange}
          >
            <CSVPieChart csvFile="./data/2a.csv" />
            <StackedBarChart csvFile="./data/2b.csv" />
          </ChartTabsPanel>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartTabsPanel
            title="Savings Predictions"
            view={view}
            handleViewChange={handleViewChange}
          >
            <CSVPieChart csvFile="./data/3Aa.csv" />
            <StackedBarChart csvFile="./data/3Ab.csv" />
          </ChartTabsPanel>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartTabsPanel
            title="Savings - actual"
            view={view}
            handleViewChange={handleViewChange}
          >
            <CSVPieChart csvFile="./data/4Aa.csv" />
            <StackedBarChart csvFile="./data/4Ab.csv" />
          </ChartTabsPanel>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartTabsPanel
            title="Energy Generated"
            view={view}
            handleViewChange={handleViewChange}
          >
            <CSVPieChart csvFile="./data/5Aa.csv" />
            <StackedBarChart csvFile="./data/5Ab.csv" />
          </ChartTabsPanel>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

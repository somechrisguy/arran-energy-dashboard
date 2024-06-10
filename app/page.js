"use client";
import { Grid } from "@mui/material";
import { ChartTabsPanel } from "./components/ChartTabsPanel";
import CSVPieChart from "./components/csvPieChart";
import StackedAreaChart from "./components/stackedAreaChart";

export default function Home() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ChartTabsPanel title="General info">
          <CSVPieChart csvFile="./data/1Aa.csv" label="2023" />
          <StackedAreaChart csvFile="./data/1Ab.csv" label="Projection" />
        </ChartTabsPanel>
      </Grid>
      <Grid item xs={12}>
        <ChartTabsPanel title="EPC Grade by Numbers of Properties">
          <CSVPieChart csvFile="./data/1Ba.csv" label="2023" />
          <StackedAreaChart csvFile="./data/1Bb.csv" label="Projection" />
        </ChartTabsPanel>
      </Grid>
      <Grid item xs={12}>
        <ChartTabsPanel title="Main heating option for properties on Arran EPC register">
          <CSVPieChart csvFile="./data/1Ca.csv" label="2023" />
          <StackedAreaChart csvFile="./data/1Cb.csv" label="Projection" />
        </ChartTabsPanel>
      </Grid>
    </Grid>
  );
}

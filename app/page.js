"use client";
import React from "react";
import { Grid, Box } from "@mui/material";
import Head from "next/head";
import ChartRow from "./components/ChartRow";

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

export const chartStyles = {
  fontSize: 12,
  fontFamily: "Arial, sans-serif",
  fill: "#FFFFFF",
  stroke: "#FFFFFF",
  color: "#FFFFFF",
};

export default function Home() {
  return (
    <>
      <Head>
        <title>REPID Dashboard</title>
      </Head>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <ChartRow title="Energy Usage" csvFile="/data/2b.csv" unit="kWh/yr" />
          <ChartRow
            title="Energy Generation"
            csvFile="/data/5Ab.csv"
            unit="kWh/yr"
          />
          <ChartRow
            title="EPC Grades"
            csvFile="/data/1Bb.csv"
            unit=" houses"
            chartType="area"
          />
          <ChartRow
            title="Main heating options"
            csvFile="/data/1Cb.csv"
            unit=" houses"
            chartType="area"
          />
          <ChartRow
            title="Predicted Savings"
            csvFile="/data/3Ab.csv"
            prefixUnit="£"
            unit="/yr"
          />
          <ChartRow
            title="Actual Savings"
            csvFile="/data/4Ab.csv"
            prefixUnit="£"
            unit="/year"
          />
        </Grid>
      </Box>
    </>
  );
}

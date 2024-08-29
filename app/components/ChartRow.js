import React, { useState, useEffect, useMemo } from "react";
import { Grid, Box, Card, Typography, CircularProgress } from "@mui/material";
import CSVDonutChart from "./csvDonutChart";
import StackedBarChart from "./stackedBarChart";
import StackedAreaChart from "./stackedAreaChart";
import SharedLegend from "./SharedLegend";

const ChartRow = ({ title, csvFile, unit = "", prefixUnit = "" }) => {
  const [currentData, setCurrentData] = useState([]);
  const [projectedData, setProjectedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);
  const isAreaChart =
    title.includes("EPC Grades") || title.includes("Main heating options");

  const sortedCurrentData = useMemo(() => {
    return [...currentData].sort((a, b) => b.value + a.value);
  }, [currentData]);

  const legendItems = useMemo(() => {
    return sortedCurrentData.map((item) => item.name);
  }, [sortedCurrentData]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(csvFile);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const rows = text
          .trim()
          .split("\n")
          .map((row) => row.split(","));
        const headers = rows[0];
        const data = rows.slice(1);

        const currentData = data.map((row) => ({
          name: row[0],
          value: parseInt(row[1], 10) || 0,
        }));

        const projectedData = headers.slice(1).map((year) => {
          const yearData = { name: year };
          data.forEach((row) => {
            yearData[row[0]] = parseInt(row[headers.indexOf(year)], 10) || 0;
          });
          return yearData;
        });

        setCurrentData(currentData);
        setProjectedData(projectedData);
      } catch (error) {
        console.error("Error fetching or parsing CSV:", error);
        setCurrentData([]);
        setProjectedData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [csvFile]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card sx={{ mb: 3, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Current (2023)
            </Typography>
            <Box sx={{ height: 400 }}>
              <CSVDonutChart
                data={sortedCurrentData}
                unit={unit}
                prefixUnit={prefixUnit}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                showLegend={false}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Projection
            </Typography>
            <Box sx={{ height: 400 }}>
              {isAreaChart ? (
                <StackedAreaChart
                  data={projectedData}
                  showLegend={false}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  dataKeys={legendItems}
                />
              ) : (
                <StackedBarChart
                  data={projectedData}
                  showLegend={false}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  dataKeys={legendItems}
                />
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <SharedLegend
            items={legendItems}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default ChartRow;

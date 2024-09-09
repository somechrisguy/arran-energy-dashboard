// app/components/ChartTabsPanel.js
"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Modal,
  CircularProgress,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CSVDonutChart from "./csvDonutChart";
import StackedBarChart from "./stackedBarChart";
import StackedAreaChart from "./stackedAreaChart";

export function ChartTabsPanel({
  title,
  view,
  csvFile,
  unit = "",
  prefixUnit = "",
  chartType = "bar",
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [projectedData, setProjectedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);

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

        const currentData = data
          .map((row) => ({
            name: row[0],
            value: parseInt(row[1], 10) || 0,
          }))
          .sort((a, b) => b.value - a.value);

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

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton onClick={handleOpenModal} size="small">
          <InfoIcon sx={{ cursor: "pointer" }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          pb: 3,
        }}
      >
        {view === "current" ? (
          <CSVDonutChart
            data={currentData}
            unit={unit}
            prefixUnit={prefixUnit}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ) : chartType === "area" ? (
          <StackedAreaChart
            data={projectedData}
            dataKeys={currentData.map((item) => item.name)}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ) : (
          <StackedBarChart
            data={projectedData}
            dataKeys={currentData.map((item) => item.name)}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        )}
      </Box>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="info-modal-title"
        aria-describedby="info-modal-description"
        disableScrollLock={true}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="info-modal-title" variant="h6" component="h2">
            Information
          </Typography>
          <Typography id="info-modal-description" sx={{ mt: 2 }}>
            This is some generic information about the chart. You can replace
            this text with specific details about the data or how to interpret
            the chart.
          </Typography>
        </Box>
      </Modal>
    </Paper>
  );
}

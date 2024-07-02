import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Paper, Box, Typography } from "@mui/material";
import { parse } from "csv-parse";
import { COLORS, chartStyles } from "../page";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        <Typography
          sx={{ color: "#fff", fontSize: "0.875rem", marginBottom: "5px" }}
        >
          {`Year: ${label}`}
        </Typography>
        {payload.map((entry, index) => (
          <Typography
            key={index}
            sx={{ color: entry.color, fontSize: "0.875rem" }}
          >
            {`${entry.name}: ${entry.value}`}
          </Typography>
        ))}
      </Box>
    );
  }
  return null;
};

const StackedAreaChart = ({ csvFile }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(csvFile);
      const text = await response.text();
      parse(text, { columns: true }, (err, records) => {
        if (err) {
          console.error("Error parsing CSV:", err);
          return;
        }
        const years = Object.keys(records[0]).filter((key) => key !== "Metric");
        const transformedData = years.map((year) => {
          const yearData = { year };
          records.forEach((record) => {
            yearData[record.Metric] = parseInt(record[year], 10);
          });
          return yearData;
        });
        setData(transformedData);
      });
    };
    fetchData();
  }, [csvFile]);

  return (
    <Paper sx={{ p: 2 }}>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" {...chartStyles} />
          <YAxis {...chartStyles} />
          <Tooltip content={<CustomTooltip />} />
          {data.length > 0 &&
            Object.keys(data[0])
              .filter((key) => key !== "year")
              .map((key, index) => (
                <Area
                  key={`area-${index}`}
                  type="monotone"
                  dataKey={key}
                  stackId="1"
                  stroke={COLORS[index % COLORS.length]}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
          <Legend
            {...chartStyles}
            formatter={(value) => (
              <span style={{ color: "white" }}>{value}</span>
            )}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default StackedAreaChart;

// app/components/csvPieChart.js
"use client";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Paper, useTheme, Box, Typography } from "@mui/material";
import { COLORS } from "../page";

const CustomTooltip = ({ active, payload }) => {
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
        <Typography sx={{ color: "#fff", fontSize: "0.875rem" }}>
          {`${payload[0].name} : ${payload[0].value}`}
        </Typography>
      </Box>
    );
  }
  return null;
};

const CSVPieChart = ({ csvFile }) => {
  const [data, setData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(csvFile);
      const text = await response.text();
      const records = text.trim().split("\n").slice(1);
      const parsedData = records.map((record) => {
        const [name, value] = record.split(",");
        return { name, value: parseInt(value, 10) };
      });
      setData(parsedData);
    };
    fetchData();
  }, [csvFile]);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Paper sx={{ p: 2, height: 400, display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          mb: 2,
        }}
      >
        {data.map((entry, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", mx: 0.5 }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                backgroundColor: COLORS[index % COLORS.length],
                mr: 1,
              }}
            />
            <Typography variant="caption" sx={{ fontSize: "0.7rem" }}>
              {entry.name}: {entry.value}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius="90%"
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default CSVPieChart;

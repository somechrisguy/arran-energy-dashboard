// app/components/csvPieChart.js
"use client";
import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
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
    <Paper sx={{ p: 2, height: 500, display: "flex", flexDirection: "column" }}>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              // label={renderCustomizedLabel}
              outerRadius="80%"
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
            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: 20 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default CSVPieChart;

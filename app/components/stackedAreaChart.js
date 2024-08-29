import React from "react";
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

const StackedAreaChart = ({ data, showLegend = true }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const keys = Object.keys(data[0]).filter((key) => key !== "name");

  return (
    <Box sx={{ p: 2 }}>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" {...chartStyles} />
          <YAxis {...chartStyles} />
          <Tooltip content={<CustomTooltip />} />
          {keys.map((key, index) => (
            <Area
              key={`area-${index}`}
              type="monotone"
              dataKey={key}
              stackId="1"
              stroke={COLORS[index % COLORS.length]}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
          {showLegend && (
            <Legend
              {...chartStyles}
              formatter={(value) => (
                <span style={{ color: "white" }}>{value}</span>
              )}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default StackedAreaChart;

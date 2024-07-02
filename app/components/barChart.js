"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { Card, Box, Typography } from "@mui/material";
import { parse } from "csv-parse/browser/esm/sync";
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
        <Typography sx={{ color: "#fff", fontSize: "0.875rem" }}>
          {`${label} : ${payload[0].value}`}
        </Typography>
      </Box>
    );
  }
  return null;
};

const SimpleBarChart = ({ csvFile }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvFile);
        const text = await response.text();
        const records = parse(text, { columns: true, skip_empty_lines: true });

        const transformedData = records.map((record) => ({
          method: record["Heating method"],
          value: parseInt(record["2023"], 10),
        }));

        setData(transformedData);
      } catch (err) {
        console.error("Error fetching or parsing CSV:", err);
      }
    };
    fetchData();
  }, [csvFile]);

  return (
    <Card className="w-full p-4">
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" {...chartStyles} />
          <YAxis
            dataKey="method"
            type="category"
            width={180}
            tick={{ fill: "white" }}
            {...chartStyles}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend {...chartStyles} />
          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SimpleBarChart;

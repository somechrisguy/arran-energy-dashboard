"use client";
import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Paper } from "@mui/material";
import { COLORS, chartStyles } from "../page";

const CSVPieChart = ({ csvFile }) => {
  const [data, setData] = useState([]);

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

  return (
    <Paper sx={{ p: 2 }}>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
          <Legend {...chartStyles} wrapperStyle={{ outline: "none" }} />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CSVPieChart;

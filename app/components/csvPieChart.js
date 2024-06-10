"use client";
import { useState, useEffect } from "react";
import { parse } from "csv-parse";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { Paper, Typography } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CSVPieChart = ({ csvFile }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(csvFile);
      const text = await response.text();
      parse(text, (err, records) => {
        if (err) {
          console.error(err);
          return;
        }
        setData(
          records
            .slice(1)
            .map(([name, value]) => ({ name, value: parseInt(value) }))
        );
      });
    };
    fetchData();
  }, [csvFile]);

  return (
    <Paper sx={{ p: 2 }}>
      <PieChart width={800} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="vetical" verticalAlign="middle" align="right" />
      </PieChart>
    </Paper>
  );
};

export default CSVPieChart;

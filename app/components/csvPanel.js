"use client";
import { useState, useEffect } from "react";
import { parse } from "csv-parse";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Paper, Typography } from "@mui/material";

const CSVPanel = ({ csvFile }) => {
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
        setData(records.slice(1).map(([x, y]) => ({ x, y: parseFloat(y) })));
      });
    };
    fetchData();
  }, [csvFile]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {csvFile}
      </Typography>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="y"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </Box>
  );
};

export default CSVPanel;

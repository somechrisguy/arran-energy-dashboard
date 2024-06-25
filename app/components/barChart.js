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
import { Card } from "@mui/material";
import { parse } from "csv-parse/browser/esm/sync";
import { COLORS, chartStyles } from "../page";

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
          <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
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

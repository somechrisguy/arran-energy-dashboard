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
} from "recharts";
import { Card } from "@mui/material";
import { parse } from "csv-parse/sync";
import { COLORS, chartStyles } from "../page";

const StackedBarChart = ({ csvFile }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvFile);
        const text = await response.text();
        const records = parse(text, { columns: true });

        const years = Object.keys(records[0]).filter((key) => key !== "Metric");
        const transformedData = years.map((year) => {
          const yearData = { year };
          records.forEach((record) => {
            yearData[record.Metric] = parseInt(record[year], 10);
          });
          return yearData;
        });
        setData(transformedData);
      } catch (err) {
        console.error("Error fetching or parsing CSV:", err);
      }
    };
    fetchData();
  }, [csvFile]);

  return (
    <Card className="p-4">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" {...chartStyles} />
          <YAxis {...chartStyles} />
          <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
          {data.length > 0 &&
            Object.keys(data[0])
              .filter((key) => key !== "year")
              .map((key, index) => (
                <Bar
                  key={`bar-${index}`}
                  dataKey={key}
                  stackId="a"
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
          <Legend {...chartStyles} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default StackedBarChart;

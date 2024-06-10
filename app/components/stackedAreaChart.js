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
import { Paper, Typography } from "@mui/material";
import { parse } from "csv-parse";

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
        // Extract years (columns headers except for the first column 'Metric')
        const years = Object.keys(records[0]).filter((key) => key !== "Metric");

        // Transform data for each year
        const transformedData = years.map((year) => {
          const yearData = { Year: year };
          records.forEach((record) => {
            yearData[record.Metric] = parseFloat(record[year]);
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
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" />
          <YAxis />
          <Tooltip />
          {data.length > 0 &&
            Object.keys(data[0])
              .filter((key) => key !== "Year")
              .map((key, idx) => (
                <Area
                  key={idx}
                  type="monotone"
                  dataKey={key}
                  stackId="1"
                  stroke={`hsl(${Math.random() * 360}, 70%, 50%)`} // Random color for each metric
                  fill={`hsl(${Math.random() * 360}, 70%, 70%)`}
                />
              ))}
          <Legend />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default StackedAreaChart;

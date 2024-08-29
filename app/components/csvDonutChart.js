"use client";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { Box, Typography } from "@mui/material";
import { COLORS } from "../page";

const CSVDonutChart = ({ csvFile, unit }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoveredLegendIndex, setHoveredLegendIndex] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(csvFile);
      const text = await response.text();
      const records = text.trim().split("\n").slice(1);
      const parsedData = records.map((record) => {
        const [name, value] = record.split(",");
        return { name, value: parseInt(value, 10) };
      });

      // Sort the data in descending order by value
      parsedData.sort((a, b) => b.value - a.value);

      setData(parsedData);
    };
    fetchData();
  }, [csvFile]);

  useEffect(() => {
    setTotal(data.reduce((a, b) => a + b.value, 0));
  }, [data]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
    } = props;

    if (activeIndex === -1 && hoveredLegendIndex === -1) {
      return (
        <g>
          <text x={cx} y={cy} dy={8} textAnchor="middle" fill="white">
            <tspan x={cx} dy="-0.6rem">
              Total
            </tspan>
            <tspan x={cx} dy="1.5em">{`${total}${
              unit ? " " + unit : ""
            }`}</tspan>
          </text>
        </g>
      );
    }

    const percent = ((payload.value / total) * 100).toFixed(1);
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill="white">
          <tspan x={cx} dy="-0.6rem">
            {payload.name.split(" ").slice(0, 2).join(" ")}
          </tspan>
          {payload.name.split(" ").length > 2 && (
            <tspan x={cx} dy="1.2em">
              {payload.name.split(" ").slice(2).join(" ")}
            </tspan>
          )}
          <tspan x={cx} dy="1.5em">{`${percent}% (${payload.value}${
            unit ? " " + unit : ""
          })`}</tspan>
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
  };

  const CustomLegend = ({ payload }) => (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 2,
      }}
    >
      {payload.map((entry, index) => (
        <Box
          key={`legend-${index}`}
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: 2,
            marginBottom: 1,
            cursor: "pointer",
          }}
          onMouseEnter={() => setHoveredLegendIndex(index)}
          onMouseLeave={() => setHoveredLegendIndex(-1)}
        >
          <Box
            sx={{
              width: 16,
              height: 16,
              backgroundColor: entry.color,
              marginRight: 1,
            }}
          />
          <Typography variant="body2">{entry.value}</Typography>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box
      sx={{
        height: "550px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          minHeight: 0,
          position: "relative",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <ResponsiveContainer width="80%" height="100%">
          <PieChart>
            <Pie
              activeIndex={
                hoveredLegendIndex !== -1 ? hoveredLegendIndex : activeIndex
              }
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius="50%"
              outerRadius="95%"
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
      <CustomLegend
        payload={data.map((item, index) => ({
          id: item.name,
          value: `${item.name} (${item.value})`,
          color: COLORS[index % COLORS.length],
        }))}
      />
    </Box>
  );
};

export default CSVDonutChart;

"use client";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { Box, Typography } from "@mui/material";
import { COLORS } from "../page";

const CSVDonutChart = ({ csvFile, unit = "", prefixUnit = "" }) => {
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

  // Function to format numbers with commas
  const formatNumber = (num) => {
    return num.toLocaleString("en-US");
  };

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;
    return (
      <g>
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

  const renderCenterText = () => {
    const selectedIndex =
      hoveredLegendIndex !== -1 ? hoveredLegendIndex : activeIndex;
    if (selectedIndex === -1) {
      return (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
        >
          <tspan x="50%" dy="-0.5em" fontSize="24" fontWeight="bold">
            Total
          </tspan>
          <tspan x="50%" dy="1.5em" fontSize="18">{`${prefixUnit}${formatNumber(
            total
          )}${unit}`}</tspan>
        </text>
      );
    } else {
      const selectedData = data[selectedIndex];
      const percent = ((selectedData.value / total) * 100).toFixed(1);
      return (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
        >
          <tspan x="50%" dy="-1.2em" fontWeight="bold" fontSize="16">
            {selectedData.name}
          </tspan>
          <tspan x="50%" dy="1.5em" fontSize="18">{`${percent}%`}</tspan>
          <tspan
            x="50%"
            dy="1.5em"
            fontSize="16"
          >{`(${prefixUnit}${formatNumber(selectedData.value)}${unit})`}</tspan>
        </text>
      );
    }
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
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flex: "0 0 500px", // Set a fixed height for the chart
          maxHeight: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
              innerRadius="60%"
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
            {renderCenterText()}
          </PieChart>
        </ResponsiveContainer>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          py: 2,
          px: 1,
        }}
      >
        <CustomLegend
          payload={data.map((item, index) => ({
            id: item.name,
            value: `${item.name}`,
            color: COLORS[index % COLORS.length],
          }))}
        />
      </Box>
    </Box>
  );
};

export default CSVDonutChart;

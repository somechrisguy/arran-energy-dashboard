import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { Box, Typography } from "@mui/material";
import { COLORS } from "../page";

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

const CSVDonutChart = ({
  data,
  unit = "",
  prefixUnit = "",
  activeIndex,
  setActiveIndex,
}) => {
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.value - a.value);
  }, [data]);

  const total = useMemo(() => {
    return sortedData.reduce((sum, entry) => sum + entry.value, 0);
  }, [sortedData]);

  const renderCenterText = () => {
    if (activeIndex === -1) {
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
          <tspan
            x="50%"
            dy="1.5em"
            fontSize="18"
          >{`${prefixUnit}${total.toLocaleString()}${unit}`}</tspan>
        </text>
      );
    } else {
      const selectedData = sortedData[activeIndex];
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
          >{`(${prefixUnit}${selectedData.value.toLocaleString()}${unit})`}</tspan>
        </text>
      );
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={sortedData}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="95%"
            fill="#8884d8"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(-1)}
          >
            {sortedData.map((entry, index) => (
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
  );
};

export default CSVDonutChart;

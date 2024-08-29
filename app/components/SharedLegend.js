import React from "react";
import { Box, Typography } from "@mui/material";
import { COLORS } from "../page";

const SharedLegend = ({ items, activeIndex, setActiveIndex }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        mt: 2,
      }}
    >
      {items.map((item, index) => (
        <Box
          key={item}
          sx={{
            display: "flex",
            alignItems: "center",
            mx: 1,
            my: 0.5,
            cursor: "pointer",
            opacity: activeIndex === -1 || activeIndex === index ? 1 : 0.5,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(-1)}
        >
          <Box
            sx={{
              width: 16,
              height: 16,
              backgroundColor: COLORS[index % COLORS.length],
              mr: 0.5,
            }}
          />
          <Typography variant="body2" sx={{ color: "white" }}>
            {item}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default SharedLegend;

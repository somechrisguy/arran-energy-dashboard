"use client";
import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, title, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function ChartTabsPanel({ children, title }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "white" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h5" sx={{ color: "black", padding: "10px" }}>
          {title}
        </Typography>
        <Tabs value={value} onChange={handleChange} aria-label="chart tabs">
          {React.Children.map(children, (child, index) => (
            <Tab label={child.props.label} key={index} />
          ))}
        </Tabs>
      </Box>
      {React.Children.map(children, (child, index) => (
        <TabPanel value={value} index={index} key={index}>
          {child}
        </TabPanel>
      ))}
    </Box>
  );
}

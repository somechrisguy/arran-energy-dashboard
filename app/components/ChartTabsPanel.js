// app/components/ChartTabsPanel.js
"use client";
import React, { useState } from "react";
import { Box, Typography, Card, IconButton, Modal } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export function ChartTabsPanel({ children, title }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

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
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton onClick={handleOpenModal} size="small">
          <InfoIcon sx={{ cursor: "pointer" }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          pb: 3,
        }}
      >
        {children}
      </Box>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="info-modal-title"
        aria-describedby="info-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="info-modal-title" variant="h6" component="h2">
            Information
          </Typography>
          <Typography id="info-modal-description" sx={{ mt: 2 }}>
            This is some generic information about the chart. You can replace
            this text with specific details about the data or how to interpret
            the chart.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

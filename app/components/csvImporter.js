import React, { useState } from "react";
import { Button, Typography, Box, CircularProgress } from "@mui/material";

const CSVImporter = ({ selectedFile, onDataImported, currentContent }) => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (event) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setIsProcessing(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("/api/convert-csv", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const processedData = await response.json();
          setIsProcessing(false);
          onDataImported(processedData);
        } else {
          alert("Error processing CSV file");
          setIsProcessing(false);
        }
      } catch (error) {
        console.error("Error processing CSV file:", error);
        alert("Error processing CSV file");
        setIsProcessing(false);
      }
    }
  };

  const handleUpdateJson = async () => {
    if (!selectedFile || !currentContent) return;

    try {
      const updatedContent = {
        ...currentContent,
        data: {
          ...currentContent.data,
          data: currentContent.data.data, // This assumes the processed CSV data is already in currentContent.data.data
        },
      };

      const response = await fetch("/api/update-json-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: selectedFile,
          content: updatedContent,
        }),
      });

      if (response.ok) {
        alert("JSON file updated successfully");
      } else {
        alert("Error updating JSON file");
      }
    } catch (error) {
      console.error("Error updating JSON file:", error);
      alert("Error updating JSON file");
    }
  };

  return (
    <Box>
      <Typography variant="h6">Update CSV Data</Typography>
      <input
        accept=".csv"
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Select CSV File
        </Button>
      </label>
      {file && (
        <Typography variant="body1" component="span" sx={{ ml: 2 }}>
          Selected file: {file.name}
        </Typography>
      )}
      {isProcessing && <CircularProgress size={24} sx={{ ml: 2 }} />}
      <Button
        onClick={handleUpdateJson}
        variant="contained"
        color="primary"
        sx={{ mt: 2, ml: 2 }}
        disabled={!file || isProcessing}
      >
        Update JSON with CSV Data
      </Button>
    </Box>
  );
};

export default CSVImporter;

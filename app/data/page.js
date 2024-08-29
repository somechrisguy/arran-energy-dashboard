"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
} from "@mui/material";
import CSVImporter from "../components/CSVImporter";

const DataManager = () => {
  const [jsonFiles, setJsonFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadJsonFiles();
  }, []);

  const loadJsonFiles = async () => {
    try {
      const response = await fetch("/api/list-json-files");
      const data = await response.json();
      setJsonFiles(data);
    } catch (error) {
      console.error("Error loading JSON files:", error);
    }
  };

  const handleFileSelect = async (filename) => {
    try {
      const response = await fetch(`/api/json-file?filename=${filename}`);
      const content = await response.json();
      setSelectedFile(filename);
      setFileContent(content);
      setTitle(content.title || "");
      setDescription(content.description || "");
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  const handleSave = async () => {
    if (selectedFile) {
      try {
        const updatedContent = {
          ...fileContent,
          title,
          description,
        };
        const response = await fetch("/api/update-json-file", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: selectedFile,
            content: updatedContent,
          }),
        });
        if (response.ok) {
          setFileContent(updatedContent);
          console.log("File updated successfully");
        } else {
          console.error("Error updating file");
        }
      } catch (error) {
        console.error("Error updating file:", error);
      }
    }
  };

  const handleDataImported = async (data) => {
    if (selectedFile) {
      try {
        const updatedContent = {
          ...fileContent,
          title,
          description,
          data: data,
        };
        const response = await fetch("/api/update-json-file", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: selectedFile,
            content: updatedContent,
          }),
        });
        if (response.ok) {
          setFileContent(updatedContent);
          console.log("File updated successfully with new CSV data");
        } else {
          console.error("Error updating file with new CSV data");
        }
      } catch (error) {
        console.error("Error updating file with new CSV data:", error);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Data Manager
      </Typography>
      <Box display="flex">
        <Box width="30%" mr={2}>
          <Typography variant="h6" gutterBottom>
            JSON Files
          </Typography>
          <List>
            {jsonFiles.map((file) => (
              <ListItem
                button="true"
                key={file}
                selected={file === selectedFile}
                onClick={() => handleFileSelect(file)}
              >
                <ListItemText primary={file} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box width="70%">
          {selectedFile ? (
            <>
              <Typography variant="h6" gutterBottom>
                Selected File: {selectedFile}
              </Typography>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                sx={{ mt: 2, mr: 2 }}
              >
                Save Changes
              </Button>
              <CSVImporter onDataImported={handleDataImported} />
              {fileContent && (
                <Box mt={2}>
                  <Typography variant="h6">Current Content:</Typography>
                  <pre>{JSON.stringify(fileContent, null, 2)}</pre>
                </Box>
              )}
            </>
          ) : (
            <Typography>Please select a file from the list</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default function DataPage() {
  return <DataManager />;
}

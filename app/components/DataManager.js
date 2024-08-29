import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CSVImporter from "./csvImporter";

const DataManager = () => {
  const [jsonFiles, setJsonFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [headers, setHeaders] = useState([]);
  const [newData, setNewData] = useState(null);

  useEffect(() => {
    loadJsonFiles();
  }, []);

  const loadJsonFiles = async () => {
    try {
      const response = await fetch("/api/data");
      const data = await response.json();
      setJsonFiles(data.files);
    } catch (error) {
      console.error("Error loading JSON files:", error);
    }
  };

  const handleFileSelect = async (filename) => {
    try {
      const response = await fetch(`/api/data?file=${filename}`);
      const content = await response.json();
      setSelectedFile(filename);
      setFileContent(content);
      setTitle(content.title || "");
      setDescription(content.description || "");
      setHeaders(content.headers || []);
      setNewData(null);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  const handleDataImported = (data) => {
    setNewData(data);
  };

  const handleSave = async () => {
    if (selectedFile) {
      try {
        const updatedContent = {
          title,
          description,
          headers,
          data: {
            headers: fileContent.data.headers,
            data: newData || fileContent.data.data,
          },
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
          setNewData(null);
          alert("File updated successfully");
        } else {
          const errorData = await response.json();
          alert(`Error updating file: ${errorData.error}`);
        }
      } catch (error) {
        console.error("Error updating file:", error);
        alert("Error updating file");
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
                button
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
              <TextField
                label="Headers (comma-separated)"
                value={headers.join(", ")}
                onChange={(e) =>
                  setHeaders(e.target.value.split(", ").map((h) => h.trim()))
                }
                fullWidth
                margin="normal"
              />
              <CSVImporter onDataImported={handleDataImported} />
              {fileContent && (
                <Box mt={2}>
                  <Typography variant="h6">Current Content:</Typography>
                  <pre>{JSON.stringify(fileContent, null, 2)}</pre>
                </Box>
              )}
              {newData && (
                <Box mt={2}>
                  <Typography variant="h6">New Data:</Typography>
                  <pre>{JSON.stringify(newData, null, 2)}</pre>
                </Box>
              )}
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={!selectedFile}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Typography>Please select a file from the list</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DataManager;

// pages/index.js
import { Grid } from "@mui/material";
import CSVPanel from "../components/csvPanel";

const csvFiles = ["test.csv", "test2.csv"];

export default function Home() {
  return (
    <Grid container spacing={2}>
      {csvFiles.map((csvFile) => (
        <Grid item xs={12} md={6} key={csvFile}>
          <CSVPanel csvFile={`${csvFile}`} />
        </Grid>
      ))}
    </Grid>
  );
}

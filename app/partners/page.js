// app/partners/page.js
import { Typography, List, ListItem, ListItemText, Paper } from "@mui/material";

const partners = [
  "Arran Eco Savvy",
  "North Ayrshire Council",
  "Arran Pioneer Project",
];

export default function Partners() {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Our Partners
      </Typography>
      <Typography paragraph>
        We are proud to work with the following organizations to promote
        renewable energy on the Isle of Arran:
      </Typography>
      <List>
        {partners.map((partner, index) => (
          <ListItem key={index}>
            <ListItemText primary={partner} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

// app/partners/page.js
import {
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

const partners = [
  {
    name: "Arran Dairies / Taste of Arran",
    url: "https://arranicecream.co.uk",
  },
  { name: "Arran Active", url: "https://www.arranactive.co.uk" },
  {
    name: "Pioneer Project / Dùthchas Arainn CBS",
    url: "https://pioneerproject.scot",
  },
  {
    name: "Island Gourmet / Robin Gray Farm",
    url: "https://www.island-gourmet.com",
  },
  { name: "Lochranza centre", url: "https://www.lochranzacentre.co.uk" },
  { name: "Arran Renewables", url: "https://www.arranrenewables.com" },
  { name: "Heritage museum", url: "https://www.arranmuseum.co.uk" },
  { name: "Auchrannie Resort", url: "https://www.auchrannie.co.uk" },
  { name: "The Kirk at Kildonan", url: "https://kirkatkildonan.com" },
  { name: "Ormidale Hotel", url: "https://www.ormidale-hotel.co.uk" },
  {
    name: "The Parlour Brodick",
    url: "https://www.facebook.com/theparlourarran/",
  },
  { name: "Little Rock Cafe", url: "https://www.littlerockarran.com" },
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
            <ListItemText
              primary={
                <Link
                  href={partner.url}
                  sx={{ color: "white" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {partner.name}
                </Link>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

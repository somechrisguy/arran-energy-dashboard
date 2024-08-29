import React from "react";
import {
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link,
} from "@mui/material";

const AboutPage = () => {
  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h2" component="h1" gutterBottom>
        About REPID
      </Typography>

      <Typography variant="h4" gutterBottom>
        REPID - Renewable Energy Progress - Indicator & Dashboard
      </Typography>

      <Typography paragraph>
        An online dashboard tool to monitor and accelerate the replacement of
        fossil-fuel based energy with fully renewable, sustainable and
        affordable energy
      </Typography>

      <Typography paragraph>
        The REPID is based on data from the Green Islands Plans. Developed by
        Arran EcoSavvy in partnership with North Ayrshire Council. See{" "}
        <Link
          href="https://arranecosavvy.org.uk/green-islands-plans/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://arranecosavvy.org.uk/green-islands-plans/
        </Link>{" "}
        for more information.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Project Phases
      </Typography>

      <Typography variant="subtitle1">Phase 1:</Typography>
      <Typography paragraph>
        Arran Net Zero plan / Arran Green Islands Net zero Carbon action plan
      </Typography>

      <Typography variant="subtitle1">Phase 2:</Typography>
      <Typography paragraph>
        Green Islands phase 2 Project Report / Arran Green Islands - Energy
        efficiency Summary Report
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Problem
      </Typography>

      <Typography paragraph>
        What the dashboard will achieve or what problem it solves?
      </Typography>

      <Typography paragraph>
        There is no accessible, realtime data or monitoring of progress being
        made for the Island of Arran to get to Net Zero in 2030. Therefore the
        energy dashboard can be used as a base for stakeholders to make better
        decisions, based on realtime data and actions. Also having an overview
        what is going on energy wise, and make the transition from fossil-fuel
        based energy to a fully renewable supply transparent and visible
        overtime.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Outcomes / How can this dashboard help
      </Typography>

      <Typography paragraph>
        What can a REPID - offer you and how can it help to get Arran faster to
        Net Zero in 2030?
      </Typography>

      <List>
        <ListItem>
          <ListItemText primary="Accessibility: accessible info for everyone online" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Create awareness and have an overview" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Monitor progress (to net Zero)" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Use up to date & real data to see where we are and were we want to be, and how to achieve these goals" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Connect to target people, Communities (groups), government, funders etc." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Identify / add (key) data sources" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Identify / add actions & projects" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Report back to + projects being done on Arran..." />
        </ListItem>
      </List>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Next fase outcomes:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Create a community: share + provide renewable energy information, advice, guidance and support. Information about carbon saving/reduction measures." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Connect with potential data supply partners: such as solar or heat pumps suppliers, local businesses and also domestic households to become 'member' of the dashboard" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Positive impact (Co2 etc.) being made (over time)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Are Net Zero targets being met?" />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Next steps:
      </Typography>

      <List>
        <ListItem>
          <ListItemText primary="Present the dashboard to the (Arran) community: Arran Island Plan Steering Group / three streams, Arran Eco Savy / Arran Renewebles, our contact list etc." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Develop the dashboard further: get acces to data sources (raw data of the 2 plans etc). Find data partners/ find members for the dashboard to subscribe to get (realtime and overtime) data." />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Funding: for example from ARIA Fund, Local Energy Scotland, Energyredress or NAVT, North Ayrshire Venture Trust."
            secondary={
              <React.Fragment>
                <Link
                  href="https://www.south-ayrshire.gov.uk/ariafund"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ARIA Fund
                </Link>
                {", "}
                <Link
                  href="https://localenergy.scot/funding/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Local Energy Scotland
                </Link>
                {", "}
                <Link
                  href="https://energyredress.org.uk/apply-funding"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Energyredress
                </Link>
                {", "}
                <Link
                  href="https://navt.org.uk/what-we-fund"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NAVT, North Ayrshire Venture Trust
                </Link>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Problems with funding: not the right constitution, additional / match
          funding needed (so we need a partnership). + More than 1 organisation
          on Arran is applying for the same funding
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutPage;

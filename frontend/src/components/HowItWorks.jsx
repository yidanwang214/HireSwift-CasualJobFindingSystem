import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SearchIcon from '@mui/icons-material/Search';
import PaymentIcon from '@mui/icons-material/Payment';

const steps = [
  { icon: <SearchIcon fontSize="large" />, title: "Search", description: "Find professionals you can trust by browsing their portfolios." },
  { icon: <WorkOutlineIcon fontSize="large" />, title: "Hire", description: "Interview favorites and hire the best fit." },
  { icon: <PaymentIcon fontSize="large" />, title: "Work", description: "Get work done efficiently and securely." }
];

const HowItWorks = () => {
  return (
    <Container maxWidth='xl' sx={{ py: 5 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        How It Works
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item xs={12} md={4} key={index} textAlign="center">
            <Box>{step.icon}</Box>
            <Typography variant="h6" component="h3">{step.title}</Typography>
            <Typography>{step.description}</Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HowItWorks;

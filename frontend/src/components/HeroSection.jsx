import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import bgp from '../assets/bgp.jpg';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: '800px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "flex-start", // Align items to the start (left side)
        paddingRight: '400px', // Increase padding to move text further to the left
        backgroundImage: `url(${bgp})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        color: 'white',
        textAlign: 'left', // Align text to the left
      }}
    >
      <Container maxWidth='md'>
        <Typography variant="h2" component="h1" gutterBottom>
          Hireswift - Trustworthy connections, efficient results.
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Connect with talented professionals for any project
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ textTransform: 'none' }} // Override text transformation to prevent all caps
          onClick={() => {
            navigate("/joblist");
          }}
        >
          Get started
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;

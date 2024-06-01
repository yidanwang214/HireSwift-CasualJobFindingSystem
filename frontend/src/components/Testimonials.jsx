import React from 'react';
import { Box, Typography, Avatar, Grid, Container } from '@mui/material';

const testimonials = [
  { name: "John Doe", feedback: "Great platform to find talented freelancers!", avatar: "/path/to/avatar1.jpg" },
  { name: "Jane Smith", feedback: "Excellent service and support.", avatar: "/path/to/avatar2.jpg" },
  { name: "Sam Wilson", feedback: "Highly recommend for quality work.", avatar: "/path/to/avatar3.jpg" }
];

const Testimonials = () => {
  return (
    <Container maxWidth='xl' sx={{ py: 5 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        What Our Clients Say
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} md={4} key={index} textAlign="center">
            <Avatar src={testimonial.avatar} sx={{ width: 80, height: 80, mx: "auto" }} />
            <Typography variant="h6" component="h3">{testimonial.name}</Typography>
            <Typography>"{testimonial.feedback}"</Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Testimonials;

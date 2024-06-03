import React from 'react';
import { Box, Typography, Avatar, Grid, Container } from '@mui/material';
import user1 from '../assets/user1.png';
import user2 from '../assets/user2.png';
import user3 from '../assets/user3.png';

const testimonials = [
  { 
    name: "John Doe", 
    feedback: "This platform has truly transformed my freelance career. The user interface is intuitive, and I consistently find high-quality projects. Highly recommend it to any freelancer.", 
    avatar: user1 
  },
  { 
    name: "Jane Smith", 
    feedback: "The support team is fantastic, and there's a great variety of projects. I've built lasting relationships with clients and increased my income significantly.", 
    avatar: user2 
  },
  { 
    name: "Sam Wilson", 
    feedback: "This is the best platform I've used. The payment system is secure, and it has helped me professionalize my freelance business. Highly recommended.", 
    avatar: user3 
  }
];

const Testimonials = () => {
  return (
    <Container maxWidth='xl' sx={{ py: 5 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 4 }}>
        What Our Clients Say
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} md={4} key={index} textAlign="center">
            <Avatar src={testimonial.avatar} sx={{ width: 80, height: 80, mx: "auto", mb: 2 }} />
            <Typography variant="h6" component="h3">{testimonial.name}</Typography>
            <Typography>"{testimonial.feedback}"</Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Testimonials;

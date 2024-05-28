import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Container } from '@mui/material';

const jobs = [
  { title: "Web Developer", description: "Looking for an experienced web developer to build a responsive website." },
  { title: "Graphic Designer", description: "Need a creative graphic designer for branding and marketing materials." },
  { title: "Content Writer", description: "Seeking a skilled content writer for blog articles and website content." }
];

const FeaturedJobs = () => {
  return (
    <Container maxWidth='xl' sx={{ py: 5 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Featured Jobs
      </Typography>
      <Grid container spacing={4}>
        {jobs.map((job, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3">{job.title}</Typography>
                <Typography>{job.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturedJobs;

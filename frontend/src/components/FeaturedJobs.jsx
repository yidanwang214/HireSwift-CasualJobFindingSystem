import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const jobs = [
  {
    title: "Web Developer",
    description:
      "Looking for an experienced web developer to build a responsive website.",
    categoryId: 18,
  },
  {
    title: "Graphic Designer",
    description:
      "Need a creative graphic designer for branding and marketing materials.",
    categoryId: 3,
  },
  {
    title: "Content Writer",
    description:
      "Seeking a skilled content writer for blog articles and website content.",
    categoryId: 9,
  },
];

const FeaturedJobs = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Featured Jobs
      </Typography>
      <Grid container spacing={4}>
        {jobs.map((job, index) => (
          <Grid item xs={12} md={4} key={index}>
            <div
              onClick={() => {
                navigate(`/joblist?categoryId=${job.categoryId}`);
              }}
              style={{ cursor: "pointer" }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h3">
                    {job.title}
                  </Typography>
                  <Typography>{job.description}</Typography>
                </CardContent>
              </Card>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturedJobs;

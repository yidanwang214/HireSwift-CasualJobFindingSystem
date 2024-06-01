import React from 'react';
import { Typography, Grid, Container } from '@mui/material';
import apple from '../assets/trustedby/apple.png';
import tiktok from '../assets/trustedby/tik-tok.png';
import facebook from '../assets/trustedby/facebook.png';
import microsoft from '../assets/trustedby/microsoft.png';
import bitcoin from '../assets/trustedby/bitcoin.png';
import instagram from '../assets/trustedby/instagram.png';
import netflix from '../assets/trustedby/netflix.png';
import reddit from '../assets/trustedby/reddit.png';
import slack from '../assets/trustedby/slack.png';
import snapeshot from '../assets/trustedby/snapeshot.png';
import youtube from '../assets/trustedby/youtube.png';
import telegram from '../assets/trustedby/telegram.png';

const logos = [
  apple, tiktok, facebook, microsoft, bitcoin, instagram,
  netflix, reddit, slack, snapeshot, youtube, telegram
];

const TrustedBy = () => {
  return (
    <Container maxWidth='md' sx={{ py: 5, textAlign: 'center' }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}> {/* Added margin-bottom */}
        Trusted By
      </Typography>
      <Grid container spacing={5} justifyContent="center">
        {logos.map((logo, index) => (
          <Grid item xs={6} sm={4} md={3} key={index} display="flex" justifyContent="center" alignItems="center">
            <img src={logo} alt={`logo${index + 1}`} style={{ maxWidth: '70px', margin: '10px' }} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TrustedBy;

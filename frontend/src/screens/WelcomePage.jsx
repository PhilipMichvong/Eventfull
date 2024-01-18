import React from 'react';
import { Button, Typography, Grid, Box, CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';
import LocationCityIcon from '@mui/icons-material/LocationCity'; // Importing a city icon from MUI icons
import InfoIcon from '@mui/icons-material/Info'; // Importing an info icon from MUI icons
import Logo from '../assets/logo.webp'; // Replace with your actual logo path

function WelcomePage() {
  return (
    <>
      <CssBaseline />
      <Grid container style={{ minHeight: '100vh', maxHeight: '100vh', overflow: 'hidden' }}>
        {/* Left side with the logo */}
        <Grid item xs={12} md={6} style={{ background: '#d2ddf2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
          <img src={Logo} alt="Eventfull Logo" style={{ width: '100%', maxHeight: '100vh', objectFit: 'contain' }} />
        </Grid>

        {/* Right side with welcome text and buttons */}
        <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2rem' }}>
          <Box style={{ textAlign: 'center', marginTop: 'auto' }}>
            <Typography variant="h3" component="h1" gutterBottom style={{ color: '#333', fontWeight: 'bold' }}>
              Welcome to Eventfull
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom style={{ margin: '1rem 0', color: '#333' }}>
              Aplikacja Eventfull zajmuje się znajdowaniem wydarzeń w Twojej okolicy.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/SignIn" style={{ marginRight: '10px' }}>
              Zaloguj się
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/SignUp">
              Zarejestruj się
            </Button>
          </Box>
          
          {/* Additional information at the bottom */}
          <Box style={{ color: 'rgba(0, 0, 0, 0.7)', textAlign: 'center', fontSize: '0.8rem', marginTop: 'auto' }}>
            <Typography gutterBottom>
              <LocationCityIcon style={{ verticalAlign: 'middle', fontSize: 'inherit' }} />
              Obsługiwane miasta: Warszawa
            </Typography>
            <Typography gutterBottom>
              <LocationCityIcon style={{ verticalAlign: 'middle', fontSize: 'inherit' }} />
              Planowane miasta: Kraków
            </Typography>
            <Typography>
              <InfoIcon style={{ verticalAlign: 'middle', fontSize: 'inherit' }} />
              Stworzone przez: Eventfullers
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default WelcomePage;

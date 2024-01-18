// ForgotPassword.jsx
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
const theme = createTheme();

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setError('Wprowadź poprawnego maila');
    } else {
      setError('');
      alert(`Password reset link sent to: ${email}`);
      // Here, you would typically handle the password reset logic
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CssBaseline />
        <Paper elevation={6} style={{ padding: '20px', maxWidth: '400px', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <EmailOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Odzyskiwanie hasła
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                error={!!error}
                helperText={error}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adres Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Odzyskaj hasło
              </Button>
              <Grid container>
                <Grid item>
                <RouterLink to='/SignIn'>
                    <Link href="#" variant="body2">
                        {"Zaloguj się"}
                      </Link>
                </RouterLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

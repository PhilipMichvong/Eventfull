// SignUp.jsx
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const theme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8090/api/register/', { email, password });
      if (response.status === 201) {
        navigate('/SignIn');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(`Istnieje już użytkownik o adresie:  ${email}`);
      } 
      
      else {
        console.error('Register failed:', error);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errorFlag = false;

    if (!validateEmail(email)) {
      setError(prev => ({ ...prev, email: 'Wprowadź poprawnego maila' }));
      errorFlag = true;
    } else {
      setError(prev => ({ ...prev, email: '' }));
    }

    if (password.length <= 4) {
      setError(prev => ({ ...prev, password: 'Hasło musi zawierać wiecej niż 4 znaki' }));
      errorFlag = true;
    } else {
      setError(prev => ({ ...prev, password: '' }));
    }

    if (password !== confirmPassword) {
      setError(prev => ({ ...prev, confirmPassword: 'Hasła nie są takie same' }));
      errorFlag = true;
    } else {
      setError(prev => ({ ...prev, confirmPassword: '' }));
    }

    if (!errorFlag) {
      handleRegister();
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Rejestracja
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                error={!!error.email}
                helperText={error.email}
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
              <TextField
                error={!!error.password}
                helperText={error.password}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Hasło"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                error={!!error.confirmPassword}
                helperText={error.confirmPassword}
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Powtórz Hasło"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Zarejestruj
              </Button>
              <Grid container>
              <Grid item xs>
                  <RouterLink to='/ForgotPassword'>
                      <Link href="#" variant="body2">
                        Zapomniałeś hasła?
                      </Link>
                  </RouterLink>
                </Grid>
                <Grid item>
                  <RouterLink to='/SignIn'>
                      <Link variant="body2">
                        Zaloguj się!
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

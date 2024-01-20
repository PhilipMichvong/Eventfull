import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const theme = createTheme({
});

export default function Login_page() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });

  const validateEmail = (email) => {
    return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8090/api/login/', { email, password });
      if (response.status === 200) {
        navigate('/Events');
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert(`Nie ma użytkownika o adresie email ${email}`);
      } else if(error.response && error.response.status ===400){
        alert(`Podano nieprawidłowe hasło`);
      } 
      
      else {
        console.error('Login failed:', error);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errorFlag = false;

    if (!validateEmail(email)) {
      setError(prev => ({ ...prev, email: 'Wprowadź poprawny adres email.' }));
      errorFlag = true;
    } else {
      setError(prev => ({ ...prev, email: '' }));
    }

    if (password.length <= 4) {
      setError(prev => ({ ...prev, password: 'Hasło musi zawierać więcej niż 4 znaki.' }));
      errorFlag = true;
    } else {
      setError(prev => ({ ...prev, password: '' }));
    }

    if (!errorFlag) {
      handleLogin();
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
              Logowanie
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Pamiętaj mnie!"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Zaloguj
              </Button>
              <Grid container>
                <Grid item xs>
                  <RouterLink to='/ForgotPassword'>
                      <Link href="/ForgotPassword" variant="body2">
                        Zapomniałeś hasła?
                      </Link>
                  </RouterLink>
                </Grid>
                <Grid item>
                  <RouterLink to='/SignUp'>
                      <Link href="/SignUp" variant="body2">
                        {"Nie masz konta? Zarejestruj się"}
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

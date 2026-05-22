import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { authSelector, login } from './authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const Login = () => {
  const dispatch = useAppDispatch();
  const { user, loggingInStatus } = useAppSelector(authSelector);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Must include Email and Password');
      return;
    }

    const actionResult = await dispatch(login({ email, password }));

    if (login.rejected.match(actionResult)) {
      setError('Email or Password are incorrect');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
        }}
      >
        {loggingInStatus === 'loading' && <LinearProgress />}
        <Box display="flex" justifyContent="center" mt={5}>
          <img src="../../img/Logo2-lg.png" alt="logo" height="250px" />
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" p={5} width={300}>
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 1.25 }}>
              {error}
            </Alert>
          )}
          <FormControl fullWidth>
            <TextField
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              sx={{ mb: 1.25 }}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </FormControl>
          <Box mt={5} mb={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogin}
              fullWidth
              sx={{ color: 'white' }}
            >
              Login
            </Button>
          </Box>
          <Link to="/signup" style={{ textAlign: 'center', color: '#577590' }}>
            Don&apos;t have an account? Sign Up!
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;

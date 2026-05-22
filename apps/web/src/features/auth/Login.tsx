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
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { authSelector, login } from './authSlice';
import { demoPresets, type DemoPreset } from './demoPresets';
import isDemoMode from '../../config';
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

  const handleLogin = async (credentials?: Pick<DemoPreset, 'email' | 'password'>) => {
    const loginEmail = credentials?.email ?? email;
    const loginPassword = credentials?.password ?? password;

    if (!loginEmail || !loginPassword) {
      setError('Must include Email and Password');
      return;
    }

    setError('');
    const actionResult = await dispatch(login({ email: loginEmail, password: loginPassword }));

    if (login.rejected.match(actionResult)) {
      setError(
        credentials ? 'Demo login failed. Please try again.' : 'Email or Password are incorrect',
      );
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
        <Box display="flex" flexDirection="column" justifyContent="center" p={5} width={340}>
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
              onClick={() => handleLogin()}
              disabled={loggingInStatus === 'loading'}
              fullWidth
              sx={{ color: 'white' }}
            >
              Login
            </Button>
          </Box>
          {isDemoMode && (
            <>
              <Divider sx={{ mb: 2 }}>or try a demo account</Divider>
              {demoPresets.map((preset) => (
                <Box key={preset.email} mb={1.5}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleLogin(preset)}
                    disabled={loggingInStatus === 'loading'}
                    fullWidth
                  >
                    {preset.label}
                  </Button>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, textAlign: 'center' }}>
                    {preset.description}
                  </Typography>
                </Box>
              ))}
            </>
          )}
          {!isDemoMode && (
            <Link to="/signup" style={{ textAlign: 'center', color: '#577590' }}>
              Don&apos;t have an account? Sign Up!
            </Link>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;

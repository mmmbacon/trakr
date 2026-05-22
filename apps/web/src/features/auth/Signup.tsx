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

import { authSelector, signup } from './authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const Signup = () => {
  const dispatch = useAppDispatch();
  const { user, signUpStatus } = useAppSelector(authSelector);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSignup = async () => {
    if (!first_name || !last_name || !email || !password || !password_confirmation) {
      setError('All fields must be filled out');
      return;
    }

    if (password !== password_confirmation) {
      setError('Passwords do not match');
      return;
    }

    const actionResult = await dispatch(signup({
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
    }));

    if (signup.rejected.match(actionResult)) {
      setError('Sign Up failed, try again');
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
        {signUpStatus === 'loading' && <LinearProgress />}
        <Box display="flex" justifyContent="center" mt={5}>
          <img src="/img/Logo2-lg.png" alt="logo" height="250px" />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" p={5} width={300}>
          <FormControl fullWidth>
            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 1.25 }}>
                {error}
              </Alert>
            )}
            <FormControl fullWidth>
              <TextField
                label="First Name"
                value={first_name}
                onChange={(event) => setFirstName(event.target.value)}
                sx={{ mb: 1.25 }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Last Name"
                value={last_name}
                onChange={(event) => setLastName(event.target.value)}
                sx={{ mb: 1.25 }}
              />
            </FormControl>
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
                sx={{ mb: 1.25 }}
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
            <FormControl fullWidth>
              <TextField
                label="Password Confirmation"
                type={showPasswordConfirmation ? 'text' : 'password'}
                value={password_confirmation}
                onChange={(event) => setPasswordConfirmation(event.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPasswordConfirmation((prev) => !prev)}
                          edge="end"
                        >
                          {showPasswordConfirmation ? <Visibility /> : <VisibilityOff />}
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
                onClick={handleSignup}
                fullWidth
                sx={{ color: 'white' }}
              >
                Sign Up
              </Button>
            </Box>
            <Link
              to="/login"
              style={{
                textAlign: 'center',
                color: '#577590',
              }}
            >
              Already have an account? Login!
            </Link>
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;

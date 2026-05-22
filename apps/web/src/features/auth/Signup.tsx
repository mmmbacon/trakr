import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import AuthLayout from '../../components/AuthLayout';
import PasswordField from '../../components/PasswordField';
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
    <AuthLayout loading={signUpStatus === 'loading'} contentWidth={300}>
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
        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          sx={{ mb: 1.25 }}
        />
        <PasswordField
          label="Password Confirmation"
          value={password_confirmation}
          onChange={setPasswordConfirmation}
        />
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
    </AuthLayout>
  );
};

export default Signup;

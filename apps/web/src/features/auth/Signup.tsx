import { useState } from 'react';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

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
    <AuthLayout loading={signUpStatus === 'loading'} maxWidth={360}>
      <Stack spacing={2}>
        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}
        <TextField
          label="First Name"
          value={first_name}
          onChange={(event) => setFirstName(event.target.value)}
          fullWidth
        />
        <TextField
          label="Last Name"
          value={last_name}
          onChange={(event) => setLastName(event.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
        />
        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
        />
        <PasswordField
          label="Password Confirmation"
          value={password_confirmation}
          onChange={setPasswordConfirmation}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSignup}
          fullWidth
          size="large"
        >
          Sign Up
        </Button>
        <Link component={RouterLink} to="/login" align="center" display="block">
          Already have an account? Login!
        </Link>
      </Stack>
    </AuthLayout>
  );
};

export default Signup;

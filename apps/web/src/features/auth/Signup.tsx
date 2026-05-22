import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

import AuthLayout from '../../components/AuthLayout';
import PasswordField from '../../components/PasswordField';
import {
  Alert,
  Box,
  Button,
  TextInput,
} from '../../components/ui';
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

    setError('');
    const actionResult = await dispatch(signup({
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
    }));

    if (signup.rejected.match(actionResult)) {
      setError('Signup failed, try again');
    }
  };

  return (
    <AuthLayout loading={signUpStatus === 'loading'} contentWidth={300}>
      {error && (
        <Alert severity="error" className="alert-full-width">
          {error}
        </Alert>
      )}
      <TextInput
        label="First Name"
        value={first_name}
        onChange={setFirstName}
        marginBottom={1.25}
      />
      <TextInput
        label="Last Name"
        value={last_name}
        onChange={setLastName}
        marginBottom={1.25}
      />
      <TextInput
        label="Email"
        value={email}
        onChange={setEmail}
        marginBottom={1.25}
      />
      <PasswordField
        label="Password"
        value={password}
        onChange={setPassword}
        marginBottom={1.25}
      />
      <PasswordField
        label="Password Confirmation"
        value={password_confirmation}
        onChange={setPasswordConfirmation}
      />
      <Box className="login-button-wrap">
        <Button
          color="secondary"
          onClick={handleSignup}
          disabled={signUpStatus === 'loading'}
          fullWidth
        >
          Sign Up
        </Button>
      </Box>
      <Link to="/login" style={{ textAlign: 'center', color: '#577590' }}>
        Already have an account? Login!
      </Link>
    </AuthLayout>
  );
};

export default Signup;

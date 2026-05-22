import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

import AuthLayout from '../../components/AuthLayout';
import PasswordField from '../../components/PasswordField';
import {
  Alert,
  Box,
  Button,
  Divider,
  TextInput,
  Typography,
} from '../../components/ui';
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
    <AuthLayout loading={loggingInStatus === 'loading'}>
      {error && (
        <Alert severity="error" className="alert-full-width">
          {error}
        </Alert>
      )}
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
      />
      <Box className="login-button-wrap">
        <Button
          color="secondary"
          onClick={() => handleLogin()}
          disabled={loggingInStatus === 'loading'}
          fullWidth
        >
          Login
        </Button>
      </Box>
      {isDemoMode && (
        <>
          <Divider marginBottom={2}>or try a demo account</Divider>
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
              <Typography
                variant="body2"
                color="secondary"
                className="demo-description"
              >
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
    </AuthLayout>
  );
};

export default Login;

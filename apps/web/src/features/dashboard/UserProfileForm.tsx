import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  FormControl,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';

import PasswordField from '../../components/PasswordField';
import UpdateModal from '../../components/UpdateModal';
import type { User } from '../../types';

interface UserProfileFormProps {
  user: User;
  onUpdate: (payload: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => Promise<boolean>;
}

export default function UserProfileForm({ user, onUpdate }: UserProfileFormProps) {
  const [first_name, setFirstName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [snack, setSnack] = useState('');

  const handleUpdateConfirm = async () => {
    setModalOpen(false);

    if (!first_name || !last_name || !email || !password || !password_confirmation) {
      setError('All fields must be filled out');
      return;
    }

    if (password !== password_confirmation) {
      setError('Passwords do not match');
      return;
    }

    const success = await onUpdate({
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
    });

    if (!success) {
      setError('Updating failed, try again');
      return;
    }

    setPassword('');
    setPasswordConfirmation('');
    setError('');
    setSnack('Successfully Updated User!');
  };

  return (
    <Box display="flex" flexDirection="column" flexGrow={1} p={2}>
      {error && (
        <Alert severity="error" sx={{ marginBottom: '10px', width: '100%' }}>
          {error}
        </Alert>
      )}
      <Typography
        variant="h4"
        sx={{
          marginTop: '-5px',
          marginBottom: '10px',
        }}
      >
        Personal Information
      </Typography>
      <FormControl>
        <TextField
          label="First Name"
          value={first_name}
          onChange={(event) => setFirstName(event.target.value)}
          sx={{ marginBottom: '10px' }}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Last Name"
          value={last_name}
          onChange={(event) => setLastName(event.target.value)}
          sx={{ marginBottom: '10px' }}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          sx={{ marginBottom: '10px' }}
        />
      </FormControl>
      <Typography
        variant="h4"
        sx={{
          marginTop: '20px',
          marginBottom: '10px',
        }}
      >
        Password
      </Typography>
      <PasswordField
        label="Password"
        value={password}
        onChange={setPassword}
        sx={{ marginBottom: '10px' }}
      />
      <PasswordField
        label="Password Confirmation"
        value={password_confirmation}
        onChange={setPasswordConfirmation}
        sx={{ marginBottom: '10px' }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => { setModalOpen(true); }}
        sx={{ marginTop: '25px', color: 'white' }}
      >
        Confirm Changes
      </Button>
      <UpdateModal
        open={modalOpen}
        onConfirm={handleUpdateConfirm}
        onDecline={() => setModalOpen(false)}
      />
      <Snackbar
        open={!!snack}
        autoHideDuration={6000}
        onClose={() => setSnack('')}
      >
        <Alert onClose={() => setSnack('')} severity="success">
          {snack}
        </Alert>
      </Snackbar>
    </Box>
  );
}

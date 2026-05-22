import { useState } from 'react';
import {
  Alert,
  Button,
  Snackbar,
  Stack,
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
    <Stack spacing={2}>
      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}
      <Typography variant="h6">
        Personal Information
      </Typography>
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
      <Typography variant="h6">
        Password
      </Typography>
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
        onClick={() => { setModalOpen(true); }}
        sx={{ alignSelf: 'flex-start' }}
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
    </Stack>
  );
}

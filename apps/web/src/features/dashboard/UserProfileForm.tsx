import { useState } from 'react';

import PasswordField from '../../components/PasswordField';
import UpdateModal from '../../components/UpdateModal';
import type { User } from '../../types';
import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextInput,
  Typography,
} from '../../components/ui';

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
        <Alert severity="error" className="alert-full-width">
          {error}
        </Alert>
      )}
      <Typography variant="h4" className="section-heading-spacing">
        Personal Information
      </Typography>
      <TextInput
        label="First Name"
        value={first_name}
        onChange={setFirstName}
        className="field-spacing"
      />
      <TextInput
        label="Last Name"
        value={last_name}
        onChange={setLastName}
        className="field-spacing"
      />
      <TextInput
        label="Email"
        value={email}
        onChange={setEmail}
        className="field-spacing"
      />
      <Typography variant="h4" className="section-heading-spacing-lg">
        Password
      </Typography>
      <PasswordField
        label="Password"
        value={password}
        onChange={setPassword}
        className="field-spacing"
      />
      <PasswordField
        label="Password Confirmation"
        value={password_confirmation}
        onChange={setPasswordConfirmation}
        className="field-spacing"
      />
      <Button
        color="secondary"
        onClick={() => { setModalOpen(true); }}
        className="confirm-button-spacing"
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

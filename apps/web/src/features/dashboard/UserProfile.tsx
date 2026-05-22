import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import UpdateModal from '../../components/UpdateModal';
import { authSelector, updateUser } from '../auth/authSlice';
import { jobsSelector } from './jobs/jobsSlice';

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(authSelector);
  const { jobs } = useAppSelector(jobsSelector);

  const [first_name, setFirstName] = useState(user?.first_name ?? '');
  const [last_name, setLastName] = useState(user?.last_name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [snack, setSnack] = useState('');

  if (!user) {
    return null;
  }

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

    const actionResult = await dispatch(updateUser({
      userId: user.id,
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
    }));

    if (updateUser.rejected.match(actionResult)) {
      setError('Updating failed, try again');
      return;
    }

    setPassword('');
    setPasswordConfirmation('');
    setSnack('Successfully Updated User!');
  };

  const handleUpdateDecline = () => {
    setModalOpen(false);
  };

  const formatDate = (string: string) => {
    const date = new Date(string);
    if (Number.isNaN(date.getTime())) {
      return '';
    }
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        width: '100%',
        paddingTop: '25px',
        paddingBottom: '25px',
      }}
    >
      <Paper sx={{ width: '100%', padding: '25px' }}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" p={2}>
              <Box
                component="img"
                src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=3b3b3b&color=fff&size=256`}
                alt="user initials"
                sx={{
                  width: '250px',
                  height: '250px',
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  marginTop: '20px',
                  marginBottom: '10px',
                }}
              >
                {`${user.first_name} ${user.last_name}`}
              </Typography>
              <Typography variant="h5" sx={{ marginBottom: '10px', marginTop: 0 }}>
                Active Since
              </Typography>
              <Typography variant="body1" sx={{ margin: 0 }}>
                {formatDate(user.created_at ?? '')}
              </Typography>
              <Typography variant="h5" sx={{ marginBottom: '10px', marginTop: '10px' }}>
                Total Number of Jobs
              </Typography>
              <Typography variant="body1" sx={{ margin: 0 }}>
                {jobs.length}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
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
              <FormControl>
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  sx={{ marginBottom: '10px' }}
                  InputProps={{
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
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  label="Password Confirmation"
                  type={showPasswordConfirmation ? 'text' : 'password'}
                  value={password_confirmation}
                  onChange={(event) => setPasswordConfirmation(event.target.value)}
                  sx={{ marginBottom: '10px' }}
                  InputProps={{
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
                  }}
                />
              </FormControl>
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
                onDecline={handleUpdateDecline}
              />
            </Box>
          </Grid>
        </Grid>
        <Snackbar
          open={!!snack}
          autoHideDuration={6000}
          onClose={() => setSnack('')}
        >
          <Alert onClose={() => setSnack('')} severity="success">
            {snack}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default UserProfile;

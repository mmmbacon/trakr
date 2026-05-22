import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authSelector, updateUser } from '../auth/authSlice';
import { jobsSelector } from './jobs/jobsSlice';
import UserProfileForm from './UserProfileForm';
import UserProfileSidebar from './UserProfileSidebar';

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(authSelector);
  const { jobs } = useAppSelector(jobsSelector);

  if (!user) {
    return null;
  }

  const handleUpdate = async (payload: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    const actionResult = await dispatch(updateUser({
      userId: user.id,
      ...payload,
    }));

    return updateUser.fulfilled.match(actionResult);
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <UserProfileSidebar user={user} jobCount={jobs.length} />
          </Grid>
          <Grid item xs={12} md={8}>
            <UserProfileForm user={user} onUpdate={handleUpdate} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserProfile;

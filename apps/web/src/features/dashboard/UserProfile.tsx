import { Container, Grid, Paper } from '@mui/material';

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

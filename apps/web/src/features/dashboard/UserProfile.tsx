import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authSelector, updateUser } from '../auth/authSlice';
import { issuesSelector } from '../issues/issuesSlice';
import { Container, Paper } from '../../components/ui';
import UserProfileForm from './UserProfileForm';
import UserProfileSidebar from './UserProfileSidebar';

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(authSelector);
  const { issues } = useAppSelector(issuesSelector);

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
    <Container maxWidth="md" className="profile-container">
      <Paper className="profile-paper">
        <div className="profile-layout">
          <UserProfileSidebar user={user} issueCount={issues.length} />
          <UserProfileForm user={user} onUpdate={handleUpdate} />
        </div>
      </Paper>
    </Container>
  );
};

export default UserProfile;

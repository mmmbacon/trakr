import { useAppDispatch } from '../../app/hooks';
import { logout } from '../auth/authSlice';
import { Button, Icon } from '../../components/ui';

const Logout = () => {
  const dispatch = useAppDispatch();

  return (
    <Button
      color="secondary"
      startIcon={<Icon name="exit" />}
      onClick={() => dispatch(logout())}
    >
      Logout
    </Button>
  );
};

export default Logout;

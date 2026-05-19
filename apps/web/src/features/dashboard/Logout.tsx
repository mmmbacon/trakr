import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../auth/authSlice';

const Logout = () => {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<ExitToAppIcon />}
      onClick={() => dispatch(logout())}
    >
      Logout
    </Button>
  );
};

export default Logout;

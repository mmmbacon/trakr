import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { authSelector } from '../features/auth/authSlice';

const PrivateRoute = () => {
  const { user } = useAppSelector(authSelector);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

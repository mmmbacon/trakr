import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dashboard from './features/dashboard/Dashboard';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import PrivateRoute from './components/PrivateRoute';
import { fetchLoggedInStatus } from './features/auth/authSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { authSelector } from './features/auth/authSlice';
import isDemoMode from './config';
import ColorModeProvider from './features/common/ColorModeProvider';

function App() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(authSelector);

  useEffect(() => {
    dispatch(fetchLoggedInStatus());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <ColorModeProvider>
        <Backdrop open>
          <CircularProgress color="inherit" />
        </Backdrop>
      </ColorModeProvider>
    );
  }

  return (
    <ColorModeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Route>
          <Route
            path="/signup"
            element={isDemoMode ? <Navigate to="/login" replace /> : <Signup />}
          />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ColorModeProvider>
  );
}

export default App;

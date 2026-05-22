import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';

import Dashboard from './features/dashboard/Dashboard';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import PrivateRoute from './components/PrivateRoute';
import { fetchLoggedInStatus } from './features/auth/authSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { authSelector } from './features/auth/authSlice';
import isDemoMode from './config';
import theme from './theme';

function App() {
  const dispatch = useAppDispatch();
  const { status, user } = useAppSelector(authSelector);

  useEffect(() => {
    dispatch(fetchLoggedInStatus());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              isDemoMode && user ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />
          <Route
            path="/login"
            element={
              isDemoMode && user ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

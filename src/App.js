import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { LoginForm } from "./components/LoginForm"
import { RegisterForm } from "./components/RegisterForm";
import { Logout } from "./components/Logout";
import { PrivateRoute } from "./components/PrivateRoute";
import { authSelector, fetchLoggedInStatus } from "./features/auth/authSlice";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector(authSelector);

  useEffect(() => {
    dispatch(fetchLoggedInStatus())
  }, [dispatch])

  if (status === 'loading') return (
    <Backdrop open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/dashboard">
          <h1>Dashboard</h1>
          <Logout />
          <Switch>
            <Route path="/dashboard/profile">
              <h1>Profile</h1>
            </Route> 
            <Route path="/dashboard/jobs">
              <h1>Jobs</h1>
            </Route> 
          </Switch>
        </PrivateRoute>
        <Route path="/profile">
          <h1>Profile</h1>
        </Route>
        <Route path="/register">
          <h1>Register</h1>
          <RegisterForm />
        </Route>
        <Route path={['/login', '/']}>
          <h1>Login</h1> 
          <LoginForm />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;

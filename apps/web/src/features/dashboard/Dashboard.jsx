/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';

import Search from './Search';
import UserProfile from './UserProfile';
import JobStats from './JobStats';
import SideBar from '../common/SideBar';
import DashboardColumn from './DashboardColumn';
import { JobsModal } from './JobsModal';
import {
  jobsSelector,
  fetchJobs,
  selectInterestedJobs,
  selectAppliedJobs,
  selectInterviewingJobs,
  selectOfferJobs,
  selectRejectedJobs,
  resetAddJobStatus,
  resetEditJobStatus,
  resetDeleteJobStatus,
} from './jobs/jobsSlice';
import {
  authSelector,
} from '../auth/authSlice';
import isDemoMode from '../../config';
import JobResources from './Drawer';

const useLayoutStyles = makeStyles({
  shell: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    minWidth: 0,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  mainScroll: {
    flex: 1,
    minHeight: 0,
    overflow: 'auto',
    width: '100%',
  },
  kanban: {
    width: '100%',
    overflowX: 'auto',
  },
  kanbanColumns: {
    minWidth: 'max-content',
  },
  column: {
    minWidth: 200,
    flex: '0 0 220px',
    maxWidth: 280,
  },
});

const Dashboard = () => {
  const layoutClasses = useLayoutStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector(authSelector);
  const {
    status, addJobStatus, editJobStatus, deleteJobStatus,
  } = useSelector(jobsSelector);
  const interestedJobs = useSelector(selectInterestedJobs);
  const appliedJobs = useSelector(selectAppliedJobs);
  const interviewingJobs = useSelector(selectInterviewingJobs);
  const offerJobs = useSelector(selectOfferJobs);
  const rejectedJobs = useSelector(selectRejectedJobs);
  const [snack, setSnack] = useState('');
  const [addJobOpen, setAddJobOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    if (addJobStatus === 'succeeded') {
      setSnack('Successfully Created!');
      dispatch(resetAddJobStatus());
    }
    if (editJobStatus === 'succeeded') {
      setSnack('Successfully Edited!');
      dispatch(resetEditJobStatus());
    }
    if (deleteJobStatus === 'succeeded') {
      setSnack('Successfully Deleted!');
      dispatch(resetDeleteJobStatus());
    }
  }, [addJobStatus, editJobStatus, deleteJobStatus]);

  const handleSnackClose = () => setSnack(false);

  if (status === 'loading') {
    return (
      <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <Box className={`dashboard-shell ${layoutClasses.shell}`}>
        <SideBar
          userdata={user}
          addButtonVisible={location.pathname === '/dashboard'}
          onAddJobClick={() => setAddJobOpen(true)}
        />
        <Box component="main" className={`dashboard-main ${layoutClasses.main}`}>
          {isDemoMode && (
            <Alert severity="info" style={{ borderRadius: 0, flexShrink: 0 }}>
              Portfolio demo — you&apos;re viewing sample data. Changes are saved locally only.
            </Alert>
          )}
          <Box className={`dashboard-main-scroll ${layoutClasses.mainScroll}`}>
            <Switch>
              <Route exact path="/dashboard">
                <Box className={layoutClasses.kanban} p={1}>
                  <Grid
                    container
                    id="dashboard-columns"
                    className={layoutClasses.kanbanColumns}
                    spacing={1}
                    wrap="nowrap"
                  >
                  {status === 'failed' ? 'Something went wrong' : (
                    <>
                      <Grid item className={layoutClasses.column}><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/zOfNZr4.png" index={0} items={interestedJobs} title="Interested" color="#F9C74F" /></Box></Grid>
                      <Grid item className={layoutClasses.column}><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/Ay2YdTb.png" index={1} items={appliedJobs} title="Applied" color="#f8961e" /></Box></Grid>
                      <Grid item className={layoutClasses.column}><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/D54n1zR.png" index={2} items={interviewingJobs} title="Interviewing" color="#90be6d" /></Box></Grid>
                      <Grid item className={layoutClasses.column}><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/rr4anU1.png" index={3} items={offerJobs} title="Offer" color="#43aa8b" /></Box></Grid>
                      <Grid item className={layoutClasses.column}><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/36wyVZ1.png" index={4} items={rejectedJobs} title="Rejected" color="#f94144" /></Box></Grid>
                    </>
                  )}
                  </Grid>
                </Box>
              </Route>
            <Route path="/dashboard/search">
              <Search />
            </Route>
            <Route path="/dashboard/user_profile">
              <UserProfile />
            </Route>
            <Route path="/dashboard/job_stats">
              <JobStats />
            </Route>
          </Switch>
        </Box>
      </Box>
      </Box>
      <JobsModal open={addJobOpen} onClose={() => setAddJobOpen(false)} />
      <JobResources />
      <Snackbar open={!!snack} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success">
          {snack}
        </Alert>
      </Snackbar>
    </>
  );
};

Dashboard.propTypes = {
  data: PropTypes.shape({}),
};

Dashboard.defaultProps = {
  data: {},
};

export default Dashboard;

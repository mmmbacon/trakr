import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

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
import { authSelector } from '../auth/authSlice';
import isDemoMode from '../../config';
import JobResources from './Drawer';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const shellSx = {
  display: 'flex',
  width: '100%',
  minHeight: '100vh',
  overflow: 'hidden',
};

const mainSx = {
  flex: 1,
  minWidth: 0,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

const mainScrollSx = {
  flex: 1,
  minHeight: 0,
  overflow: 'auto',
  width: '100%',
};

const kanbanSx = {
  width: '100%',
  overflowX: 'auto',
};

const kanbanColumnsSx = {
  minWidth: 'max-content',
};

const columnSx = {
  minWidth: 200,
  flex: '0 0 220px',
  maxWidth: 280,
};

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user } = useAppSelector(authSelector);
  const {
    status, addJobStatus, editJobStatus, deleteJobStatus,
  } = useAppSelector(jobsSelector);
  const interestedJobs = useAppSelector(selectInterestedJobs);
  const appliedJobs = useAppSelector(selectAppliedJobs);
  const interviewingJobs = useAppSelector(selectInterviewingJobs);
  const offerJobs = useAppSelector(selectOfferJobs);
  const rejectedJobs = useAppSelector(selectRejectedJobs);
  const [snack, setSnack] = useState('');
  const [addJobOpen, setAddJobOpen] = useState(false);

  const isDashboardHome = location.pathname === '/dashboard'
    || location.pathname === '/dashboard/';

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
  }, [addJobStatus, deleteJobStatus, dispatch, editJobStatus]);

  const handleSnackClose = () => setSnack('');

  if (status === 'loading') {
    return (
      <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <Box className="dashboard-shell" sx={shellSx}>
        <SideBar
          userdata={user ?? undefined}
          addButtonVisible={isDashboardHome}
          onAddJobClick={() => setAddJobOpen(true)}
        />
        <Box component="main" className="dashboard-main" sx={mainSx}>
          {isDemoMode && (
            <Alert severity="info" sx={{ borderRadius: 0, flexShrink: 0 }}>
              Portfolio demo — you&apos;re viewing sample data. Changes are saved locally only.
            </Alert>
          )}
          <Box className="dashboard-main-scroll" sx={mainScrollSx}>
            <Routes>
              <Route
                index
                element={(
                  <Box sx={kanbanSx} p={1}>
                    <Grid
                      container
                      id="dashboard-columns"
                      sx={kanbanColumnsSx}
                      spacing={1}
                      wrap="nowrap"
                    >
                      {status === 'failed' ? 'Something went wrong' : (
                        <>
                          <Grid item sx={columnSx}><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/zOfNZr4.png" index={0} items={interestedJobs} title="Interested" color="#F9C74F" /></Box></Grid>
                          <Grid item sx={columnSx}><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/Ay2YdTb.png" index={1} items={appliedJobs} title="Applied" color="#f8961e" /></Box></Grid>
                          <Grid item sx={columnSx}><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/D54n1zR.png" index={2} items={interviewingJobs} title="Interviewing" color="#90be6d" /></Box></Grid>
                          <Grid item sx={columnSx}><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/rr4anU1.png" index={3} items={offerJobs} title="Offer" color="#43aa8b" /></Box></Grid>
                          <Grid item sx={columnSx}><Box display="flex"><DashboardColumn tickUrl="https://i.imgur.com/36wyVZ1.png" index={4} items={rejectedJobs} title="Rejected" color="#f94144" /></Box></Grid>
                        </>
                      )}
                    </Grid>
                  </Box>
                )}
              />
              <Route path="search" element={<Search />} />
              <Route path="user_profile" element={<UserProfile />} />
              <Route path="job_stats" element={<JobStats />} />
            </Routes>
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

export default Dashboard;

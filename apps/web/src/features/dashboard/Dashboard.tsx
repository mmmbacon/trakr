import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import Search from './Search';
import UserProfile from './UserProfile';
import JobStats from './JobStats';
import SideBar from '../common/SideBar';
import KanbanBoard, { KANBAN_COLUMNS } from './KanbanBoard';
import { JobsModal } from './jobs/JobsModal';
import {
  jobsSelector,
  fetchJobs,
  selectInterestedJobs,
  selectAppliedJobs,
  selectInterviewingJobs,
  selectOfferJobs,
  selectRejectedJobs,
} from './jobs/jobsSlice';
import { useJobStatusSnackbar } from './jobs/useJobStatusSnackbar';
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

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user } = useAppSelector(authSelector);
  const { status } = useAppSelector(jobsSelector);
  const interestedJobs = useAppSelector(selectInterestedJobs);
  const appliedJobs = useAppSelector(selectAppliedJobs);
  const interviewingJobs = useAppSelector(selectInterviewingJobs);
  const offerJobs = useAppSelector(selectOfferJobs);
  const rejectedJobs = useAppSelector(selectRejectedJobs);
  const { snack, handleSnackClose } = useJobStatusSnackbar();
  const [addJobOpen, setAddJobOpen] = useState(false);

  const isDashboardHome = location.pathname === '/dashboard'
    || location.pathname === '/dashboard/';

  const jobColumns = [
    interestedJobs,
    appliedJobs,
    interviewingJobs,
    offerJobs,
    rejectedJobs,
  ];

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

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
                  status === 'failed' ? (
                    <Box p={1}>Something went wrong</Box>
                  ) : (
                    <KanbanBoard
                      columns={KANBAN_COLUMNS.map((column, index) => ({
                        ...column,
                        items: jobColumns[index] ?? [],
                      }))}
                    />
                  )
                )}
              />
              <Route path="search" element={<Search />} />
              <Route path="user_profile" element={<UserProfile />} />
              <Route path="job_stats" element={<JobStats />} />
            </Routes>
          </Box>
        </Box>
      </Box>
      <JobsModal open={addJobOpen} onClose={() => setAddJobOpen(false)} mode="create" />
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

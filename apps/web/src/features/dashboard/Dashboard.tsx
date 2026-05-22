import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';

import AppHeader from '../common/AppHeader';
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
import { authSelector, logout } from '../auth/authSlice';
import isDemoMode from '../../config';
import JobResources from './Drawer';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(authSelector);
  const { status } = useAppSelector(jobsSelector);
  const interestedJobs = useAppSelector(selectInterestedJobs);
  const appliedJobs = useAppSelector(selectAppliedJobs);
  const interviewingJobs = useAppSelector(selectInterviewingJobs);
  const offerJobs = useAppSelector(selectOfferJobs);
  const rejectedJobs = useAppSelector(selectRejectedJobs);
  const { snack, handleSnackClose } = useJobStatusSnackbar();
  const [addJobOpen, setAddJobOpen] = useState(false);

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

  const handleLogOut = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  if (status === 'loading') {
    return (
      <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <Box display="flex" flexDirection="column" height="100vh" overflow="hidden">
        <AppHeader userdata={user ?? undefined} onLogout={handleLogOut} />

        <Box display="flex" flex={1} minHeight={0} overflow="hidden">
          <SideBar />
          <Box component="main" flex={1} minWidth={0} overflow="auto">
            <Routes>
              <Route
                index
                element={(
                  status === 'failed' ? (
                    <Box p={2}>Something went wrong</Box>
                  ) : (
                    <KanbanBoard
                      columns={KANBAN_COLUMNS.map((column, index) => ({
                        ...column,
                        items: jobColumns[index] ?? [],
                      }))}
                      onAddJobClick={() => setAddJobOpen(true)}
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
      {isDemoMode && (
        <Paper
          elevation={6}
          sx={{
            position: 'fixed',
            bottom: 24,
            left: 24,
            zIndex: (theme) => theme.zIndex.snackbar,
            maxWidth: 360,
          }}
        >
          <Alert severity="info">
            Portfolio demo — you&apos;re viewing sample data. Changes are saved locally only.
          </Alert>
        </Paper>
      )}
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

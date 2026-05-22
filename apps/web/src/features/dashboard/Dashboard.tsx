import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

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
import {
  Alert,
  Box,
  LoadingOverlay,
  Snackbar,
} from '../../components/ui';

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
    return <LoadingOverlay open />;
  }

  return (
    <>
      <Box className="dashboard-shell">
        <SideBar
          userdata={user ?? undefined}
          addButtonVisible={isDashboardHome}
          onAddJobClick={() => setAddJobOpen(true)}
        />
        <Box component="main" className="dashboard-main">
          {isDemoMode && (
            <Alert severity="info" square>
              Portfolio demo — you&apos;re viewing sample data. Changes are saved locally only.
            </Alert>
          )}
          <Box className="dashboard-main-scroll">
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

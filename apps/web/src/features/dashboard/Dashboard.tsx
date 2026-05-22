import { useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

import AppHeader from '../common/AppHeader';
import UserProfile from './UserProfile';
import SideBar from '../common/SideBar';
import ProjectLayout from '../projects/ProjectLayout';
import ProjectWorkspace from '../projects/ProjectWorkspace';
import { useIssueStatusSnackbar } from '../issues/useIssueStatusSnackbar';
import { authSelector, logout } from '../auth/authSlice';
import isDemoMode from '../../config';
import { fetchProjects, projectsSelector } from '../projects/projectsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  Alert,
  Box,
  LoadingOverlay,
  Paper,
  Snackbar,
} from '../../components/ui';
import { defaultDashboardPath, projectBoardPath } from '../projects/projectRoutes';

function DashboardRedirect() {
  const { projects, activeProjectKey, status } = useAppSelector(projectsSelector);

  if (status === 'loading' && projects.length === 0) {
    return <LoadingOverlay open />;
  }

  const key = activeProjectKey ?? projects[0]?.key;
  if (!key) {
    return <Box p={2}>No projects yet.</Box>;
  }

  return <Navigate to={defaultDashboardPath(key)} replace />;
}

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(authSelector);
  const { projects, activeProjectKey, status: projectsStatus } = useAppSelector(projectsSelector);
  const { snack, handleSnackClose } = useIssueStatusSnackbar();

  const activeProject = projects.find((project) => project.key === activeProjectKey) ?? null;

  useEffect(() => {
    if (projects.length > 0) {
      return;
    }
    dispatch(fetchProjects());
  }, [dispatch, projects.length]);

  const handleLogOut = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const isBootLoading = projectsStatus === 'loading' && projects.length === 0;

  if (isBootLoading) {
    return <LoadingOverlay open />;
  }

  return (
    <>
      <Box display="flex" flexDirection="column" height="100vh" overflow="hidden">
        <AppHeader
          userdata={user ?? undefined}
          onLogout={handleLogOut}
          projectName={activeProject?.name}
        />

        <Box display="flex" flex={1} minHeight={0} overflow="hidden">
          <SideBar />
          <Box
            component="main"
            flex={1}
            minWidth={0}
            minHeight={0}
            display="flex"
            flexDirection="column"
            overflow="hidden"
          >
            <Routes>
              <Route index element={<DashboardRedirect />} />
              <Route path="projects/:projectKey/*" element={<ProjectLayout />}>
                <Route path="*" element={<ProjectWorkspace />} />
              </Route>
              <Route path="user_profile" element={<UserProfile />} />
              <Route
                path="*"
                element={<Navigate to={projectBoardPath(activeProjectKey ?? projects[0]?.key ?? 'TRK')} replace />}
              />
            </Routes>
          </Box>
        </Box>
      </Box>
      {isDemoMode && (
        <Box position="fixed" className="demo-mode-banner">
          <Paper elevation={6}>
            <Alert severity="info">
              Portfolio demo — sample issues and projects. Changes persist in your session.
            </Alert>
          </Paper>
        </Box>
      )}
      <Snackbar open={!!snack} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success">
          {snack}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Dashboard;

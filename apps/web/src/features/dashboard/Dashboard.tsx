import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import AppHeader from '../common/AppHeader';
import UserProfile from './UserProfile';
import SideBar from '../common/SideBar';
import KanbanBoard from './KanbanBoard';
import { IssuesModal } from '../issues/IssuesModal';
import { fetchIssues, issuesSelector } from '../issues/issuesSlice';
import { useIssueStatusSnackbar } from '../issues/useIssueStatusSnackbar';
import { authSelector, logout } from '../auth/authSlice';
import isDemoMode from '../../config';
import {
  fetchProjects,
  fetchWorkflowStates,
  projectsSelector,
  selectActiveProject,
} from '../projects/projectsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  Alert,
  Box,
  LoadingOverlay,
  Paper,
  Snackbar,
} from '../../components/ui';
import { getKanbanColumnsFromStates } from '../board/kanbanColumns';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(authSelector);
  const { status: projectsStatus, workflowStates, activeProjectKey } =
    useAppSelector(projectsSelector);
  const { status: issuesStatus, issues } = useAppSelector(issuesSelector);
  const activeProject = useAppSelector(selectActiveProject);
  const { snack, handleSnackClose } = useIssueStatusSnackbar();
  const [addIssueOpen, setAddIssueOpen] = useState(false);

  const isLoading =
    projectsStatus === 'loading' ||
    (issuesStatus === 'loading' && !activeProject);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (activeProjectKey) {
      dispatch(fetchWorkflowStates(activeProjectKey));
      dispatch(fetchIssues(activeProjectKey));
    }
  }, [dispatch, activeProjectKey]);

  const handleLogOut = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const kanbanColumns = getKanbanColumnsFromStates(workflowStates).map((column) => ({
    ...column,
    items: issues.filter((issue) => issue.workflow_state.id === column.stateId),
  }));

  if (isLoading) {
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
            overflow="auto"
          >
            <Routes>
              <Route
                index
                element={(
                  projectsStatus === 'failed' || issuesStatus === 'failed' ? (
                    <Box p={2}>Something went wrong</Box>
                  ) : activeProject ? (
                    <KanbanBoard
                      columns={kanbanColumns}
                      onAddIssueClick={() => setAddIssueOpen(true)}
                      projectName={activeProject.name}
                    />
                  ) : (
                    <Box p={2}>No projects yet.</Box>
                  )
                )}
              />
              <Route path="user_profile" element={<UserProfile />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
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
      <IssuesModal open={addIssueOpen} onClose={() => setAddIssueOpen(false)} mode="create" />
      <Snackbar open={!!snack} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success">
          {snack}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Dashboard;

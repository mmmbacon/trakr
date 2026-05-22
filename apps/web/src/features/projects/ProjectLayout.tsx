import { useEffect, useRef } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchWorkflowStates,
  projectsSelector,
  setActiveProjectKey,
} from '../projects/projectsSlice';
import { fetchIssues } from '../issues/issuesSlice';
import { Box, LoadingOverlay } from '../../components/ui';
import { defaultDashboardPath } from './projectRoutes';

export default function ProjectLayout() {
  const { projectKey } = useParams();
  const dispatch = useAppDispatch();
  const { projects, status: projectsStatus } = useAppSelector(projectsSelector);
  const loadedProjectKey = useRef<string | null>(null);

  useEffect(() => {
    if (!projectKey) {
      return;
    }
    dispatch(setActiveProjectKey(projectKey));
    if (loadedProjectKey.current === projectKey) {
      return;
    }
    loadedProjectKey.current = projectKey;
    dispatch(fetchWorkflowStates(projectKey));
    dispatch(fetchIssues(projectKey));
  }, [dispatch, projectKey]);

  if (projectsStatus === 'loading' && projects.length === 0) {
    return <LoadingOverlay open />;
  }

  const projectExists = projectKey && projects.some((project) => project.key === projectKey);
  if (projectsStatus !== 'loading' && projects.length > 0 && !projectExists) {
    return <Navigate to={defaultDashboardPath(projects[0]?.key)} replace />;
  }

  if (projects.length === 0 && projectsStatus !== 'loading') {
    return <Box p={2}>No projects yet.</Box>;
  }

  return <Outlet />;
}

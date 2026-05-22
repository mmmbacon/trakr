import { useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation, useMatch, useParams } from 'react-router-dom';

import BoardView from '../board/BoardView';
import IssueListView from '../list/IssueListView';
import IssuePanel from '../issues/IssuePanel';
import { IssuesModal } from '../issues/IssuesModal';
import { Box } from '../../components/ui';
import { projectBoardPath } from './projectRoutes';

type BackgroundView = 'board' | 'list';

function parseBackgroundView(pathname: string, fromState?: BackgroundView): BackgroundView {
  if (fromState) {
    return fromState;
  }
  return pathname.includes('/list') ? 'list' : 'board';
}

export default function ProjectWorkspace() {
  const { projectKey } = useParams();
  const location = useLocation();
  const issueMatch = useMatch('/dashboard/projects/:projectKey/issues/:issueNumber');
  const [addIssueOpen, setAddIssueOpen] = useState(false);
  const [boardMounted, setBoardMounted] = useState(false);
  const [listMounted, setListMounted] = useState(false);

  const fromState = (location.state as { from?: BackgroundView } | null)?.from;
  const activeView = parseBackgroundView(location.pathname, fromState);
  const issueNumberParam = issueMatch?.params.issueNumber;
  const parsedIssueNumber = issueNumberParam ? Number.parseInt(issueNumberParam, 10) : null;
  const showPanel = Boolean(
    projectKey
    && parsedIssueNumber
    && !Number.isNaN(parsedIssueNumber),
  );

  const isIndexPath = useMemo(() => {
    if (!projectKey) {
      return true;
    }
    const base = `/dashboard/projects/${projectKey}`;
    return location.pathname === base || location.pathname === `${base}/`;
  }, [location.pathname, projectKey]);

  useEffect(() => {
    if (activeView === 'board') {
      setBoardMounted(true);
    }
    if (activeView === 'list') {
      setListMounted(true);
    }
  }, [activeView]);

  if (isIndexPath && projectKey) {
    return <Navigate to={projectBoardPath(projectKey)} replace />;
  }

  if (showPanel && (!projectKey || !parsedIssueNumber)) {
    return <Navigate to={projectBoardPath(projectKey ?? 'TRK')} replace />;
  }

  return (
    <Box position="relative" flex={1} minWidth={0} minHeight={0} overflow="hidden">
      {boardMounted ? (
        <Box
          display={activeView === 'board' ? 'flex' : 'none'}
          flexDirection="column"
          flex={1}
          minHeight={0}
          minWidth={0}
          overflow="hidden"
          aria-hidden={activeView !== 'board'}
        >
          <BoardView onAddIssueClick={() => setAddIssueOpen(true)} />
        </Box>
      ) : null}
      {listMounted ? (
        <Box
          display={activeView === 'list' ? 'flex' : 'none'}
          flexDirection="column"
          flex={1}
          minHeight={0}
          minWidth={0}
          overflow="hidden"
          aria-hidden={activeView !== 'list'}
        >
          <IssueListView />
        </Box>
      ) : null}
      {showPanel && projectKey && parsedIssueNumber ? (
        <IssuePanel
          projectKey={projectKey}
          issueNumber={parsedIssueNumber}
          backgroundView={activeView}
        />
      ) : null}
      <IssuesModal open={addIssueOpen} onClose={() => setAddIssueOpen(false)} mode="create" />
    </Box>
  );
}

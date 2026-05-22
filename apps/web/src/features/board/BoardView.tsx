import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { getKanbanColumnsFromStates } from '../board/kanbanColumns';
import { issuesSelector } from '../issues/issuesSlice';
import { projectsSelector } from '../projects/projectsSlice';
import { projectIssuePath } from '../projects/projectRoutes';
import KanbanBoard from '../dashboard/KanbanBoard';

interface BoardViewProps {
  onAddIssueClick: () => void;
}

export default function BoardView({ onAddIssueClick }: BoardViewProps) {
  const navigate = useNavigate();
  const { projectKey } = useParams();
  const { workflowStates } = useAppSelector(projectsSelector);
  const { issues, status: issuesStatus } = useAppSelector(issuesSelector);
  const activeProject = useAppSelector((state) => {
    const { projects, activeProjectKey } = state.projects;
    return projects.find((project) => project.key === (projectKey ?? activeProjectKey)) ?? null;
  });

  const kanbanColumns = useMemo(
    () => getKanbanColumnsFromStates(workflowStates).map((column) => ({
      ...column,
      items: issues.filter((issue) => issue.workflow_state.id === column.stateId),
    })),
    [workflowStates, issues],
  );

  const handleOpenIssue = (issueNumber: number) => {
    if (!projectKey) {
      return;
    }
    navigate(projectIssuePath(projectKey, issueNumber), { state: { from: 'board' } });
  };

  if (issuesStatus === 'failed') {
    return null;
  }

  return (
    <KanbanBoard
      columns={kanbanColumns}
      onAddIssueClick={onAddIssueClick}
      projectName={activeProject?.name}
      onOpenIssue={handleOpenIssue}
    />
  );
}

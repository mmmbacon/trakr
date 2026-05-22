import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IssueListTable } from '../../components/ui';
import { useAppSelector } from '../../app/hooks';
import type { Issue, Priority } from '../../types';
import { issuesSelector } from '../issues/issuesSlice';
import { projectsSelector } from '../projects/projectsSlice';
import { projectIssuePath } from '../projects/projectRoutes';
import { PRIORITY_OPTIONS } from '../issues/constants';

type SortKey = 'updated_at' | 'priority' | 'status';

function compareIssues(a: Issue, b: Issue, sortKey: SortKey): number {
  if (sortKey === 'updated_at') {
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  }
  if (sortKey === 'priority') {
    const order = ['urgent', 'high', 'medium', 'low', 'none'];
    return order.indexOf(a.priority) - order.indexOf(b.priority);
  }
  return a.workflow_state.name.localeCompare(b.workflow_state.name);
}

export default function IssueListView() {
  const navigate = useNavigate();
  const { projectKey } = useParams();
  const { issues } = useAppSelector(issuesSelector);
  const { workflowStates } = useAppSelector(projectsSelector);
  const activeProject = useAppSelector((state) => {
    const { projects, activeProjectKey } = state.projects;
    return projects.find((project) => project.key === (projectKey ?? activeProjectKey)) ?? null;
  });

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<number | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('updated_at');

  const filteredIssues = useMemo(() => {
    const query = search.trim().toLowerCase();
    return [...issues]
      .filter((issue) => {
        if (statusFilter !== 'all' && issue.workflow_state.id !== statusFilter) {
          return false;
        }
        if (priorityFilter !== 'all' && issue.priority !== priorityFilter) {
          return false;
        }
        if (!query) {
          return true;
        }
        return (
          issue.identifier.toLowerCase().includes(query)
          || issue.title.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => compareIssues(a, b, sortKey));
  }, [issues, search, statusFilter, priorityFilter, sortKey]);

  const handleOpenIssue = (issueNumber: number) => {
    if (!projectKey) {
      return;
    }
    navigate(projectIssuePath(projectKey, issueNumber), { state: { from: 'list' } });
  };

  return (
    <IssueListTable
      issues={filteredIssues}
      projectName={activeProject?.name}
      search={search}
      statusFilter={statusFilter}
      priorityFilter={priorityFilter}
      sortKey={sortKey}
      workflowStates={workflowStates}
      priorityOptions={PRIORITY_OPTIONS}
      onSearchChange={setSearch}
      onStatusFilterChange={setStatusFilter}
      onPriorityFilterChange={setPriorityFilter}
      onSortKeyChange={setSortKey}
      onOpenIssue={handleOpenIssue}
    />
  );
}

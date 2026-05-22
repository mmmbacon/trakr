import { formatDistanceToNow } from 'date-fns';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import StatusPill from './StatusPill';
import type { Issue, Priority, WorkflowState } from '../../types';

export interface IssueListTableProps {
  issues: Issue[];
  projectName?: string;
  search: string;
  statusFilter: number | 'all';
  priorityFilter: Priority | 'all';
  sortKey: 'updated_at' | 'priority' | 'status';
  workflowStates: WorkflowState[];
  priorityOptions: Array<{ value: Priority; label: string }>;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: number | 'all') => void;
  onPriorityFilterChange: (value: Priority | 'all') => void;
  onSortKeyChange: (value: 'updated_at' | 'priority' | 'status') => void;
  onOpenIssue: (issueNumber: number) => void;
}

export default function IssueListTable({
  issues,
  projectName,
  search,
  statusFilter,
  priorityFilter,
  sortKey,
  workflowStates,
  priorityOptions,
  onSearchChange,
  onStatusFilterChange,
  onPriorityFilterChange,
  onSortKeyChange,
  onOpenIssue,
}: IssueListTableProps) {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box
        sx={{
          px: 1.5,
          py: 0.75,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" component="h1">
          {projectName ? `${projectName} List` : 'Issues'}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={0.75}
        alignItems="center"
        sx={{ px: 1.5, py: 0.75, borderBottom: 1, borderColor: 'divider' }}
      >
        <TextField
          size="small"
          placeholder="Search issues…"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          sx={{ minWidth: 160, flex: 1, maxWidth: 280 }}
        />
        <Select
          size="small"
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value as number | 'all')}
          displayEmpty
          sx={{ minWidth: 112 }}
        >
          <MenuItem value="all">All statuses</MenuItem>
          {workflowStates.map((state) => (
            <MenuItem key={state.id} value={state.id}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          size="small"
          value={priorityFilter}
          onChange={(event) => onPriorityFilterChange(event.target.value as Priority | 'all')}
          displayEmpty
          sx={{ minWidth: 112 }}
        >
          <MenuItem value="all">All priorities</MenuItem>
          {priorityOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <Select
          size="small"
          value={sortKey}
          onChange={(event) => onSortKeyChange(event.target.value as typeof sortKey)}
          sx={{ minWidth: 100 }}
        >
          <MenuItem value="updated_at">Updated</MenuItem>
          <MenuItem value="priority">Priority</MenuItem>
          <MenuItem value="status">Status</MenuItem>
        </Select>
      </Box>
      <Box flex={1} minHeight={0} sx={{ overflow: 'auto' }}>
        {issues.length === 0 ? (
          <Box p={2}>
            <Typography variant="body2" color="text.secondary">
              No issues match filters
            </Typography>
          </Box>
        ) : (
          <Table
            size="small"
            stickyHeader
            sx={{
              minWidth: '100%',
              width: 'max-content',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ whiteSpace: 'nowrap', width: '1%' }}>ID</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>Title</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', width: '1%' }}>Status</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', width: '1%' }}>Priority</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', width: '1%' }}>Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issues.map((issue) => (
                <TableRow
                  key={issue.id}
                  hover
                  tabIndex={0}
                  role="button"
                  onClick={() => onOpenIssue(issue.number)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onOpenIssue(issue.number);
                    }
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <Typography variant="caption" fontFamily="var(--font-mono)" noWrap>
                      {issue.identifier}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>{issue.title}</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <StatusPill name={issue.workflow_state.name} slug={issue.workflow_state.slug} />
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {issue.priority === 'none' ? '—' : issue.priority}
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {formatDistanceToNow(new Date(issue.updated_at), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </Box>
  );
}

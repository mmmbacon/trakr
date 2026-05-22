import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import StatusPill from './StatusPill';
import type { Priority, WorkflowState } from '../../types';

export interface IssuePanelHeaderViewProps {
  identifier: string;
  title: string;
  priority: Priority;
  workflowStateId: number;
  workflowStates: WorkflowState[];
  priorityOptions: Array<{ value: Priority; label: string }>;
  onClose: () => void;
  onTitleChange: (title: string) => void;
  onStatusChange: (workflowStateId: number) => void;
  onPriorityChange: (priority: Priority) => void;
}

export default function IssuePanelHeaderView({
  identifier,
  title,
  priority,
  workflowStateId,
  workflowStates,
  priorityOptions,
  onClose,
  onTitleChange,
  onStatusChange,
  onPriorityChange,
}: IssuePanelHeaderViewProps) {
  const [titleValue, setTitleValue] = useState(title);

  useEffect(() => {
    setTitleValue(title);
  }, [title]);

  return (
    <Box sx={{ px: 1.5, py: 1, borderBottom: 1, borderColor: 'divider' }}>
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={1}>
        <Typography
          variant="caption"
          fontFamily="var(--font-mono)"
          color="text.secondary"
          sx={{ pt: 0.5 }}
        >
          {identifier}
        </Typography>
        <IconButton size="small" aria-label="Close issue panel" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <TextField
        fullWidth
        variant="standard"
        value={titleValue}
        onChange={(event) => {
          setTitleValue(event.target.value);
          onTitleChange(event.target.value);
        }}
        InputProps={{
          disableUnderline: true,
          sx: { fontSize: 'var(--text-base)', fontWeight: 600, py: 0.25 },
        }}
        aria-label="Issue title"
      />
      <Box display="flex" flexWrap="wrap" alignItems="center" gap={0.75} mt={0.75}>
        <Select
          size="small"
          value={workflowStateId}
          onChange={(event) => onStatusChange(Number(event.target.value))}
          renderValue={(value) => {
            const state = workflowStates.find((item) => item.id === value);
            return state ? <StatusPill name={state.name} slug={state.slug} /> : null;
          }}
          sx={{ minWidth: 112 }}
        >
          {workflowStates.map((state) => (
            <MenuItem key={state.id} value={state.id}>
              <StatusPill name={state.name} slug={state.slug} />
            </MenuItem>
          ))}
        </Select>
        <Select
          size="small"
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value as Priority)}
          sx={{ minWidth: 100 }}
        >
          {priorityOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
}

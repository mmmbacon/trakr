import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { Issue } from '../../types';

export interface IssueCardProps {
  issue: Issue;
  onOpen: () => void;
  isDragging?: boolean;
  dragHandleProps?: Record<string, unknown>;
}

const IssueCard = forwardRef<HTMLDivElement, IssueCardProps>(function IssueCard(
  {
    issue,
    onOpen,
    isDragging = false,
    dragHandleProps,
    ...rest
  },
  ref,
) {
  return (
    <Paper
      ref={ref}
      component="article"
      variant="outlined"
      elevation={0}
      aria-label={`${issue.identifier}, ${issue.title}`}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen();
        }
      }}
      tabIndex={0}
      role="button"
      sx={{
        width: '100%',
        cursor: 'pointer',
        opacity: isDragging ? 0.4 : 1,
        '&:hover': { bgcolor: 'action.hover' },
        '&:focus-visible': {
          outline: 2,
          outlineColor: 'primary.main',
          outlineOffset: -2,
        },
      }}
      {...rest}
    >
      <Box sx={{ py: 'var(--space-1)', px: 'var(--space-2)' }}>
        <Stack direction="row" alignItems="flex-start" spacing={0.5} width="100%">
          <Stack flex={1} minWidth={0} spacing={0}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontFamily="var(--font-mono)"
              noWrap
            >
              {issue.identifier}
            </Typography>
            <Typography variant="body2" fontWeight={600} sx={{ fontSize: 'var(--text-sm)' }}>
              {issue.title}
            </Typography>
            {issue.priority !== 'none' ? (
              <Typography variant="caption" color="text.secondary" noWrap display="block">
                {issue.priority}
              </Typography>
            ) : null}
          </Stack>
          {dragHandleProps ? (
            <Box
              {...dragHandleProps}
              aria-label="Drag issue"
              onClick={(event) => event.stopPropagation()}
              sx={{
                color: 'text.disabled',
                cursor: 'grab',
                px: 0.25,
                lineHeight: 1,
                '&:active': { cursor: 'grabbing' },
              }}
            >
              ⋮⋮
            </Box>
          ) : null}
        </Stack>
      </Box>
    </Paper>
  );
});

export default IssueCard;

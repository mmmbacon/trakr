import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { Issue } from '../../types';
import JobItemActionsMenu from './JobItemActionsMenu';

export interface IssueItemCardProps {
  issue: Issue;
  onEdit: () => void;
  onDelete: () => void;
}

export default function IssueItemCard({
  issue,
  onEdit,
  onDelete,
}: IssueItemCardProps) {
  return (
    <Box position="relative" width="100%">
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
          <JobItemActionsMenu
            ariaLabel={`Actions for ${issue.identifier}`}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Stack>
      </Box>
    </Box>
  );
}

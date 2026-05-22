import { formatDistanceToNow } from 'date-fns';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { Activity, WorkflowState } from '../../types';

export interface ActivityStreamProps {
  activities: Activity[];
  workflowStates: WorkflowState[];
}

function resolveStateName(
  workflowStates: WorkflowState[],
  stateId: unknown,
): string {
  const id = typeof stateId === 'number' ? stateId : Number(stateId);
  return workflowStates.find((state) => state.id === id)?.name ?? 'Unknown';
}

function ActivityItem({
  activity,
  workflowStates,
}: {
  activity: Activity;
  workflowStates: WorkflowState[];
}) {
  const timestamp = formatDistanceToNow(new Date(activity.created_at), { addSuffix: true });
  const actorName = activity.actor.name || 'System';

  let body = activity.body;
  if (activity.kind === 'status_change' && activity.metadata) {
    const fromName = resolveStateName(workflowStates, activity.metadata.from_state_id);
    const toName = resolveStateName(workflowStates, activity.metadata.to_state_id);
    body = `Moved from ${fromName} to ${toName}`;
  } else if (activity.kind === 'created') {
    body = 'Created this issue';
  }

  return (
    <Box
      sx={{
        py: 1,
        borderBottom: 1,
        borderColor: 'divider',
        '&:last-child': { borderBottom: 0 },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" gap={1}>
        <Typography variant="caption" fontWeight={600}>
          {actorName}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {timestamp}
        </Typography>
      </Stack>
      {body ? (
        <Typography variant="body2" sx={{ mt: 0.25, whiteSpace: 'pre-wrap' }}>
          {body}
        </Typography>
      ) : null}
    </Box>
  );
}

export default function ActivityStream({ activities, workflowStates }: ActivityStreamProps) {
  if (activities.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No activity yet
      </Typography>
    );
  }

  return (
    <Box>
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          workflowStates={workflowStates}
        />
      ))}
    </Box>
  );
}

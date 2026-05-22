import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

import { getFirstEvent } from '../features/dashboard/jobs/jobMappers';
import { normalizeUrl } from '../utils/url';
import JobItemActionsMenu from './JobItemActionsMenu';
import type { Job } from '../types';

interface JobItemCardProps {
  job: Job;
  logo: string;
  eventExpired: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function JobItemCard({
  job,
  logo,
  eventExpired,
  onEdit,
  onDelete,
}: JobItemCardProps) {
  const redirectUrl = job.url ? normalizeUrl(job.url) : null;
  const firstEvent = getFirstEvent(job);
  const expiredEventLabel = firstEvent?.title
    ? `Scheduled event "${firstEvent.title}" has passed`
    : 'Scheduled event has passed';

  return (
    <Box position="relative" width="100%">
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <JobItemActionsMenu
          ariaLabel={`Actions for ${job.company} job`}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Box>
      <Stack direction="row" alignItems="center" spacing={1} width="100%" pr={3}>
        {eventExpired ? (
          <Tooltip title={expiredEventLabel} arrow>
            <NewReleasesIcon
              color="error"
              fontSize="small"
              sx={{ position: 'absolute', top: 0, left: 0 }}
              aria-hidden
            />
          </Tooltip>
        ) : null}
        <Avatar
          component="a"
          href={redirectUrl ?? undefined}
          target="_blank"
          rel="noreferrer"
          aria-label={redirectUrl ? `Open ${job.company} job posting` : undefined}
          src={logo}
          alt=""
          variant="rounded"
          sx={{ width: 36, height: 36 }}
        />
        <Box flex={1} minWidth={0}>
          <Typography variant="subtitle2" noWrap>
            {job.company}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {job.title}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap display="block">
            {job.location}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

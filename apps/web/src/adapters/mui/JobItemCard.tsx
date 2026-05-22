import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

import { getFirstEvent } from '../../features/dashboard/jobs/jobMappers';
import { normalizeUrl } from '../../utils/url';
import type { Job } from '../../types';
import JobItemActionsMenu from './JobItemActionsMenu';

export interface JobItemCardProps {
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
      {eventExpired ? (
        <Box position="absolute" top={0.5} left={0.5} zIndex={1}>
          <Tooltip title={expiredEventLabel} arrow>
            <NewReleasesIcon color="error" fontSize="small" aria-hidden />
          </Tooltip>
        </Box>
      ) : null}
      <Box py={1} px={1.5}>
        <Stack direction="row" alignItems="center" spacing={1} width="100%">
          <Avatar
            component="a"
            href={redirectUrl ?? undefined}
            target="_blank"
            rel="noreferrer"
            aria-label={redirectUrl ? `Open ${job.company} job posting` : undefined}
            src={logo}
            alt=""
            variant="rounded"
          />
          <Stack flex={1} minWidth={0} spacing={0.25}>
            <Typography variant="subtitle2" noWrap>
              {job.company}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {job.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap display="block">
              {job.location}
            </Typography>
          </Stack>
          <JobItemActionsMenu
            ariaLabel={`Actions for ${job.company} job`}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Stack>
      </Box>
    </Box>
  );
}

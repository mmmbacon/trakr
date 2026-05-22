import {
  Box,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

import { getFirstEvent } from '../features/dashboard/jobs/jobMappers';
import { normalizeUrl } from '../utils/url';
import type { Job } from '../types';

interface JobItemCardProps {
  job: Job;
  logo: string;
  eventExpired: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

function JobItemToolbar({ job, onEdit, onDelete }: Pick<JobItemCardProps, 'job' | 'onEdit' | 'onDelete'>) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexShrink={0}
      alignItems="center"
    >
      <IconButton
        aria-label={`Edit ${job.company} job`}
        onClick={onEdit}
        size="small"
        sx={{ color: '#d9d9d9', p: 0.25 }}
      >
        <EditIcon sx={{ fontSize: 18 }} />
      </IconButton>
      <IconButton
        aria-label={`Delete ${job.company} job`}
        onClick={onDelete}
        size="small"
        sx={{ color: '#d9d9d9', p: 0.25 }}
      >
        <DeleteIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  );
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
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      width="100%"
      gap={0.5}
    >
      {eventExpired ? (
        <Tooltip title={expiredEventLabel} arrow>
          <Box
            component="span"
            sx={{
              position: 'absolute',
              top: 4,
              left: 4,
              display: 'flex',
              lineHeight: 0,
            }}
          >
            <NewReleasesIcon sx={{ color: '#f94144', fontSize: 16 }} aria-hidden />
          </Box>
        </Tooltip>
      ) : null}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          flexShrink: 0,
          width: 36,
          minWidth: 36,
          height: 36,
        }}
      >
        <Box
          component="a"
          href={redirectUrl ?? undefined}
          target="_blank"
          rel="noreferrer"
          aria-label={redirectUrl ? `Open ${job.company} job posting` : undefined}
          sx={{ lineHeight: 0 }}
        >
          <Box
            component="img"
            src={logo}
            alt=""
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        flex={1}
        minWidth={0}
        sx={{ overflow: 'hidden' }}
      >
        <Typography
          variant="subtitle1"
          align="left"
          noWrap
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          {job.company}
        </Typography>
        <Typography
          variant="body2"
          align="left"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 500,
            lineHeight: 1.2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {job.title}
        </Typography>
        <Typography
          variant="caption"
          align="left"
          noWrap
          sx={{
            fontFamily: 'Source Sans Pro, sans-serif',
            lineHeight: 1.2,
            pt: 0.25,
          }}
        >
          {job.location}
        </Typography>
      </Box>
      <JobItemToolbar job={job} onEdit={onEdit} onDelete={onDelete} />
    </Box>
  );
}

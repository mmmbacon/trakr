import {
  Box,
  Icon,
  IconButton,
  Tooltip,
  Typography,
} from './ui';
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
    <Box display="flex" flexDirection="row" flexShrink={0} alignItems="center">
      <IconButton
        aria-label={`Edit ${job.company} job`}
        onClick={onEdit}
      >
        <Icon name="edit" size={18} />
      </IconButton>
      <IconButton
        aria-label={`Delete ${job.company} job`}
        onClick={onDelete}
      >
        <Icon name="delete" size={18} />
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
    <Box className="job-item-card">
      {eventExpired ? (
        <Tooltip title={expiredEventLabel}>
          <Box className="job-item-expired-badge" component="span">
            <Icon name="new-releases" size={16} color="#f94144" />
          </Box>
        </Tooltip>
      ) : null}
      <Box className="job-item-logo-wrap">
        <Box
          component="a"
          href={redirectUrl ?? undefined}
          target="_blank"
          rel="noreferrer"
          aria-label={redirectUrl ? `Open ${job.company} job posting` : undefined}
          className="job-item-logo-link"
        >
          <Box
            component="img"
            src={logo}
            alt=""
            className="job-item-logo"
          />
        </Box>
      </Box>
      <Box className="job-item-content">
        <Typography variant="subtitle1" align="left" noWrap className="job-item-company">
          {job.company}
        </Typography>
        <Typography variant="body2" align="left" className="job-item-title">
          {job.title}
        </Typography>
        <Typography variant="caption" align="left" noWrap className="job-item-location">
          {job.location}
        </Typography>
      </Box>
      <JobItemToolbar job={job} onEdit={onEdit} onDelete={onDelete} />
    </Box>
  );
}

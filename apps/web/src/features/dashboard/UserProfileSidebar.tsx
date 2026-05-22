import { format, isValid, parseISO } from 'date-fns';

import type { User } from '../../types';
import { Box, Typography } from '../../components/ui';
import { buildAvatarUrl } from '../../utils/url';

interface UserProfileSidebarProps {
  user: User;
  jobCount: number;
}

function formatDate(value: string) {
  const date = parseISO(value);
  if (!isValid(date)) {
    return '';
  }
  return format(date, 'MMM d, yyyy');
}

export default function UserProfileSidebar({ user, jobCount }: UserProfileSidebarProps) {
  return (
    <Box className="profile-sidebar">
      <Box
        component="img"
        src={buildAvatarUrl(`${user.first_name} ${user.last_name}`, 256)}
        alt="user initials"
        className="profile-avatar"
      />
      <Typography variant="h4" className="section-heading-spacing-lg">
        {`${user.first_name} ${user.last_name}`}
      </Typography>
      <Typography variant="h5" marginBottom={1.25}>
        Active Since
      </Typography>
      <Typography variant="body1">
        {formatDate(user.created_at ?? '')}
      </Typography>
      <Typography variant="h5" marginBottom={1.25} marginTop={1.25}>
        Total Number of Jobs
      </Typography>
      <Typography variant="body1">
        {jobCount}
      </Typography>
    </Box>
  );
}

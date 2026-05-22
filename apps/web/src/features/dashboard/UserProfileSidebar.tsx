import { format, isValid, parseISO } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { User } from '../../types';

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
  const initials = `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`;

  return (
    <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
      <Avatar sx={{ width: 160, height: 160, fontSize: 48 }}>
        {initials}
      </Avatar>
      <Typography variant="h5">
        {`${user.first_name} ${user.last_name}`}
      </Typography>
      <Stack spacing={0.5}>
        <Typography variant="subtitle1">
          Active Since
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatDate(user.created_at ?? '')}
        </Typography>
      </Stack>
      <Stack spacing={0.5}>
        <Typography variant="subtitle1">
          Total Number of Jobs
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {jobCount}
        </Typography>
      </Stack>
    </Stack>
  );
}

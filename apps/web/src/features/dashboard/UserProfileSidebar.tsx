import { format, isValid, parseISO } from 'date-fns';
import { Box, Typography } from '@mui/material';

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
  return (
    <Box display="flex" flexDirection="column" p={2}>
      <Box
        component="img"
        src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=3b3b3b&color=fff&size=256`}
        alt="user initials"
        sx={{
          width: '250px',
          height: '250px',
        }}
      />
      <Typography
        variant="h4"
        sx={{
          marginTop: '20px',
          marginBottom: '10px',
        }}
      >
        {`${user.first_name} ${user.last_name}`}
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: '10px', marginTop: 0 }}>
        Active Since
      </Typography>
      <Typography variant="body1" sx={{ margin: 0 }}>
        {formatDate(user.created_at ?? '')}
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: '10px', marginTop: '10px' }}>
        Total Number of Jobs
      </Typography>
      <Typography variant="body1" sx={{ margin: 0 }}>
        {jobCount}
      </Typography>
    </Box>
  );
}

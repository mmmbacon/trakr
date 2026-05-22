import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { getWorkflowColor } from '../../tokens';

export interface StatusPillProps {
  name: string;
  slug: string;
}

export default function StatusPill({ name, slug }: StatusPillProps) {
  const color = getWorkflowColor(slug);

  return (
    <Box display="inline-flex" alignItems="center" gap={0.75}>
      <Box
        component="span"
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: color,
          flexShrink: 0,
        }}
      />
      <Typography variant="caption" color="text.secondary" noWrap>
        {name}
      </Typography>
    </Box>
  );
}

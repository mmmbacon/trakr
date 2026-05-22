import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

export interface DashboardColumnHeadingProps {
  title?: string;
  color?: string;
  count?: number;
}

export default function DashboardColumnHeading({
  title = 'Heading',
  color,
  count = 0,
}: DashboardColumnHeadingProps) {
  return (
    <Box
      sx={{
        mb: 0.75,
        px: 1,
        py: 0.75,
        borderRadius: 'var(--radius-sm)',
        borderLeft: 3,
        borderColor: color ?? 'divider',
        bgcolor: color ? alpha(color, 0.12) : 'action.hover',
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
        <Typography variant="subtitle2" noWrap sx={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </Typography>
        <Chip
          label={count}
          size="small"
          variant="outlined"
          sx={{
            minWidth: 22,
            fontWeight: 600,
            borderColor: color ? alpha(color, 0.5) : undefined,
            bgcolor: 'background.paper',
          }}
        />
      </Stack>
    </Box>
  );
}

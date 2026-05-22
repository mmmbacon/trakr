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

const DashboardColumnHeading = ({
  title = 'Heading',
  color,
  count = 0,
}: DashboardColumnHeadingProps) => (
  <Box
    sx={{
      mb: 1.5,
      px: 1.5,
      py: 1.25,
      borderRadius: 1,
      borderLeft: 4,
      borderColor: color ?? 'divider',
      bgcolor: color ? alpha(color, 0.14) : 'action.hover',
    }}
  >
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
      <Typography variant="subtitle2" fontWeight={600} noWrap>
        {title}
      </Typography>
      <Chip
        label={count}
        size="small"
        variant="outlined"
        sx={{
          minWidth: 28,
          height: 22,
          fontWeight: 600,
          borderColor: color ? alpha(color, 0.5) : undefined,
          bgcolor: 'background.paper',
        }}
      />
    </Stack>
  </Box>
);

export default DashboardColumnHeading;

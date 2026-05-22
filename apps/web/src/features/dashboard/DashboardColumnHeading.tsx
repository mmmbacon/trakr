import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

export interface DashboardColumnHeadingProps {
  title?: string;
  color?: string;
}

const DashboardColumnHeading = ({
  title = 'Heading',
  color,
}: DashboardColumnHeadingProps) => (
  <Paper variant="outlined" sx={{ mb: 1, p: 1 }}>
    <Stack direction="row" justifyContent="center">
      <Chip
        label={title}
        size="small"
        sx={color ? {
          bgcolor: color,
          color: 'common.white',
          fontWeight: 700,
          textTransform: 'uppercase',
        } : undefined}
      />
    </Stack>
  </Paper>
);

export default DashboardColumnHeading;

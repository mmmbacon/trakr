import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import type { Job } from '../../types';
import theme from '../../theme';
import DashboardColumn from './DashboardColumn';

interface KanbanColumnConfig {
  title: string;
  color: string;
  items: Job[];
}

interface KanbanBoardProps {
  columns: KanbanColumnConfig[];
}

export default function KanbanBoard({ columns }: KanbanBoardProps) {
  return (
    <Box overflow="auto" p={2}>
      <Grid
        container
        id="dashboard-columns"
        component="section"
        aria-label="Job application board"
        spacing={2}
        wrap="nowrap"
        sx={{ minWidth: 'max-content' }}
      >
        {columns.map((column) => (
          <Grid item key={column.title} sx={{ minWidth: 280, maxWidth: 320 }}>
            <DashboardColumn
              items={column.items}
              title={column.title}
              color={column.color}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export const KANBAN_COLUMNS = [
  { title: 'Interested', color: theme.palette.jobStatus.interested },
  { title: 'Applied', color: theme.palette.jobStatus.applied },
  { title: 'Interviewing', color: theme.palette.jobStatus.interviewing },
  { title: 'Offer', color: theme.palette.jobStatus.offer },
  { title: 'Rejected', color: theme.palette.jobStatus.rejected },
] as const;

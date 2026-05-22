import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import type { Job } from '../../types';
import theme from '../../theme';
import DashboardColumn from './DashboardColumn';
import KanbanActionBar from './KanbanActionBar';

interface KanbanColumnConfig {
  title: string;
  color: string;
  items: Job[];
}

interface KanbanBoardProps {
  columns: KanbanColumnConfig[];
  onAddJobClick: () => void;
}

export default function KanbanBoard({ columns, onAddJobClick }: KanbanBoardProps) {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <KanbanActionBar onAddJobClick={onAddJobClick} />
      <Box overflow="auto" flex={1} p={2}>
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

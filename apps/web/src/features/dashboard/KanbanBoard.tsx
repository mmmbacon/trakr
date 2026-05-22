import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import type { Job } from '../../types';
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
      <Box
        flex={1}
        minHeight={0}
        p={2}
        sx={{ overflowX: 'auto', overflowY: 'auto' }}
      >
        <Grid
          container
          id="dashboard-columns"
          component="section"
          aria-label="Job application board"
          spacing={2}
          wrap="nowrap"
          sx={{ width: 'max-content', minWidth: '100%' }}
        >
          {columns.map((column) => (
            <Grid item key={column.title} sx={{ minWidth: 280, maxWidth: 320, flexShrink: 0 }}>
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


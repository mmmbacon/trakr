import type { Job } from '../../types';
import { kanbanColors } from '../../tokens';
import { Box, Grid } from '../../components/ui';
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
      <Box flex={1} minHeight={0} p={2} overflow="auto">
        <Grid
          container
          id="dashboard-columns"
          component="section"
          aria-label="Job application board"
          spacing={2}
          wrap="nowrap"
          className="kanban-columns"
        >
          {columns.map((column) => (
            <Grid item key={column.title} className="kanban-column">
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
  { title: 'Interested', color: kanbanColors.interested },
  { title: 'Applied', color: kanbanColors.applied },
  { title: 'Interviewing', color: kanbanColors.interviewing },
  { title: 'Offer', color: kanbanColors.offer },
  { title: 'Rejected', color: kanbanColors.rejected },
] as const;

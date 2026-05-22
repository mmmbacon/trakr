import type { Issue } from '../../types';
import { Box, Grid } from '../../components/ui';
import DashboardColumn from './DashboardColumn';
import KanbanActionBar from './KanbanActionBar';

interface KanbanColumnConfig {
  title: string;
  color: string;
  items: Issue[];
}

interface KanbanBoardProps {
  columns: KanbanColumnConfig[];
  onAddIssueClick: () => void;
  projectName?: string;
}

export default function KanbanBoard({
  columns,
  onAddIssueClick,
  projectName,
}: KanbanBoardProps) {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <KanbanActionBar onAddIssueClick={onAddIssueClick} projectName={projectName} />
      <Box flex={1} minHeight={0} px={1.5} py={1} overflow="auto">
        <Grid
          container
          id="dashboard-columns"
          component="section"
          aria-label="Issue board"
          spacing={1}
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

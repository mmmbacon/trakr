import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import type { Job } from '../../types';
import DashboardColumn from './DashboardColumn';

const kanbanSx = {
  width: '100%',
  overflowX: 'auto',
};

const kanbanColumnsSx = {
  minWidth: 'max-content',
};

const columnSx = {
  minWidth: 240,
  flex: '0 0 240px',
  maxWidth: 300,
};

interface KanbanColumnConfig {
  title: string;
  color: string;
  tickUrl: string;
  items: Job[];
}

interface KanbanBoardProps {
  columns: KanbanColumnConfig[];
}

export default function KanbanBoard({ columns }: KanbanBoardProps) {
  return (
    <Box sx={kanbanSx} p={1}>
      <Grid
        container
        id="dashboard-columns"
        component="section"
        aria-label="Job application board"
        sx={kanbanColumnsSx}
        spacing={1}
        wrap="nowrap"
      >
        {columns.map((column, index) => (
          <Grid item key={column.title} sx={columnSx}>
            <Box display="flex">
              <DashboardColumn
                tickUrl={column.tickUrl}
                index={index}
                items={column.items}
                title={column.title}
                color={column.color}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export const KANBAN_COLUMNS = [
  { title: 'Interested', color: '#F9C74F', tickUrl: 'https://i.imgur.com/zOfNZr4.png' },
  { title: 'Applied', color: '#f8961e', tickUrl: 'https://i.imgur.com/Ay2YdTb.png' },
  { title: 'Interviewing', color: '#90be6d', tickUrl: 'https://i.imgur.com/D54n1zR.png' },
  { title: 'Offer', color: '#43aa8b', tickUrl: 'https://i.imgur.com/rr4anU1.png' },
  { title: 'Rejected', color: '#f94144', tickUrl: 'https://i.imgur.com/36wyVZ1.png' },
] as const;

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

interface KanbanActionBarProps {
  onAddJobClick: () => void;
}

export default function KanbanActionBar({ onAddJobClick }: KanbanActionBarProps) {
  return (
    <Paper
      square
      elevation={0}
      sx={{
        px: 2,
        py: 1.5,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
        <Typography variant="h6" component="h1">
          Job Board
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={onAddJobClick}
        >
          Add New Job
        </Button>
      </Box>
    </Paper>
  );
}

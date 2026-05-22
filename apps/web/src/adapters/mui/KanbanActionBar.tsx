import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

interface KanbanActionBarProps {
  onAddIssueClick: () => void;
  projectName?: string;
}

export default function KanbanActionBar({
  onAddIssueClick,
  projectName,
}: KanbanActionBarProps) {
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
          {projectName ? `${projectName} Board` : 'Board'}
        </Typography>
        <Button
          disableElevation
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={onAddIssueClick}
          sx={{
            bgcolor: 'background.paper',
            color: 'text.primary',
            borderColor: 'divider',
            boxShadow: 'none',
            '&:hover': {
              bgcolor: 'action.hover',
              borderColor: 'divider',
              boxShadow: 'none',
            },
          }}
        >
          New Issue
        </Button>
      </Box>
    </Paper>
  );
}

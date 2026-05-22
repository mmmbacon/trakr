import { Box, Button, Stack } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SaveIcon from '@mui/icons-material/Save';

interface JobFormActionsProps {
  isEditMode: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  onReset: () => void;
  onDeleteClick: () => void;
}

export default function JobFormActions({
  isEditMode,
  onCancel,
  onSubmit,
  onReset,
  onDeleteClick,
}: JobFormActionsProps) {
  return (
    <Stack direction="row" justifyContent="space-between" p={2} spacing={2}>
      <Box>
        {isEditMode ? (
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={onDeleteClick}
          >
            Delete
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<RotateLeftIcon />}
            onClick={onReset}
          >
            Reset Form
          </Button>
        )}
      </Box>
      <Stack direction="row" spacing={2}>
        <Button
          type="button"
          onClick={onCancel}
          variant="outlined"
          startIcon={<CancelIcon />}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={onSubmit}
          variant="contained"
          color="secondary"
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}

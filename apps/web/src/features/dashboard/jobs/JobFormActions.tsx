import { Box, Button } from '@mui/material';
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
    <Box display="flex" flexDirection="row" justifyContent="space-between" p={2}>
      <Box>
        {isEditMode ? (
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={onDeleteClick}
            sx={{ backgroundColor: '#F94144', color: 'white' }}
          >
            Delete
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ backgroundColor: '#a9a9a9', color: 'white' }}
            startIcon={<RotateLeftIcon />}
            onClick={onReset}
          >
            Reset Form
          </Button>
        )}
      </Box>
      <Box display="flex" flexGrow={1} justifyContent="flex-end">
        <Box mr={2}>
          <Button
            type="button"
            onClick={onCancel}
            variant="contained"
            color="primary"
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        </Box>
      </Box>
      <Box>
        <Button
          type="submit"
          onClick={onSubmit}
          variant="contained"
          color="secondary"
          sx={{ color: 'white' }}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

import {
  Box,
  Button,
  Icon,
} from '../../components/ui';

interface IssueFormActionsProps {
  isEditMode: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  onReset: () => void;
  onDeleteClick: () => void;
}

export default function IssueFormActions({
  isEditMode,
  onCancel,
  onSubmit,
  onReset,
  onDeleteClick,
}: IssueFormActionsProps) {
  return (
    <Box className="form-actions">
      <Box>
        {isEditMode ? (
          <Button
            color="danger"
            startIcon={<Icon name="delete" />}
            onClick={onDeleteClick}
          >
            Delete
          </Button>
        ) : (
          <Button
            color="neutral"
            startIcon={<Icon name="rotate-left" />}
            onClick={onReset}
          >
            Reset Form
          </Button>
        )}
      </Box>
      <Box className="form-actions-end">
        <Box className="form-actions-cancel">
          <Button
            type="button"
            onClick={onCancel}
            color="primary"
            startIcon={<Icon name="cancel" />}
          >
            Cancel
          </Button>
        </Box>
      </Box>
      <Box>
        <Button
          type="submit"
          onClick={onSubmit}
          color="secondary"
          startIcon={<Icon name="save" />}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

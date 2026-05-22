import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export interface UpdateModalProps {
  open?: boolean;
  onConfirm?: () => void;
  onDecline?: () => void;
}

const UpdateModal = ({
  open = false,
  onConfirm = () => {},
  onDecline = () => {},
}: UpdateModalProps) => (
  <Dialog
    open={open}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to update your account information?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" onClick={onDecline}>
        Cancel
      </Button>
      <Button variant="contained" color="secondary" onClick={onConfirm}>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default UpdateModal;

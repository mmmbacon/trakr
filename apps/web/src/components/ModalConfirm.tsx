import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

interface ModalConfirmProps {
  id?: string;
  open?: boolean;
  onConfirm?: () => void;
  onDecline?: () => void;
}

const ModalConfirm = ({
  id,
  open = false,
  onConfirm = () => {},
  onDecline = () => {},
}: ModalConfirmProps) => (
  <Dialog
    id={id}
    open={open}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to delete this job?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onDecline} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default ModalConfirm;

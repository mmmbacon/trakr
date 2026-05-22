import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalText,
  ModalTitle,
} from './ui';

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
  <Modal
    id={id}
    open={open}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <ModalTitle id="alert-dialog-title">Warning</ModalTitle>
    <ModalContent>
      <ModalText id="alert-dialog-description">
        Are you sure you want to delete this job?
      </ModalText>
    </ModalContent>
    <ModalActions>
      <Button onClick={onDecline} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="danger">
        Delete
      </Button>
    </ModalActions>
  </Modal>
);

export default ModalConfirm;

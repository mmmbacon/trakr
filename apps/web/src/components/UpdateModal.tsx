import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalText,
  ModalTitle,
} from './ui';

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
  <Modal
    open={open}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <ModalTitle id="alert-dialog-title">Warning</ModalTitle>
    <ModalContent>
      <ModalText id="alert-dialog-description">
        Are you sure you want to update your account information?
      </ModalText>
    </ModalContent>
    <ModalActions>
      <Button color="primary" onClick={onDecline}>
        Cancel
      </Button>
      <Button color="secondary" onClick={onConfirm}>
        CONFIRM
      </Button>
    </ModalActions>
  </Modal>
);

export default UpdateModal;

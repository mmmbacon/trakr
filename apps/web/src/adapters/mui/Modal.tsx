import MuiDialog from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogContentText from '@mui/material/DialogContentText';
import MuiDialogTitle from '@mui/material/DialogTitle';

import type {
  ModalActionsProps,
  ModalContentProps,
  ModalProps,
  ModalTextProps,
  ModalTitleProps,
} from '../../components/ui/types';

export function Modal({
  open,
  onClose,
  children,
  className,
  fullWidth,
  maxWidth,
  id,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  onClick,
}: ModalProps) {
  return (
    <MuiDialog
      id={id}
      open={open}
      onClose={onClose}
      className={className}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      onClick={onClick}
    >
      {children}
    </MuiDialog>
  );
}

export function ModalContent({ children, dividers, className }: ModalContentProps) {
  return (
    <MuiDialogContent dividers={dividers} className={className} sx={{ p: 2.5 }}>
      {children}
    </MuiDialogContent>
  );
}

export function ModalTitle({ children, id }: ModalTitleProps) {
  return <MuiDialogTitle id={id}>{children}</MuiDialogTitle>;
}

export function ModalText({ children, id }: ModalTextProps) {
  return <MuiDialogContentText id={id}>{children}</MuiDialogContentText>;
}

export function ModalActions({ children }: ModalActionsProps) {
  return <MuiDialogActions>{children}</MuiDialogActions>;
}

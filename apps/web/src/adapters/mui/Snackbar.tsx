import MuiSnackbar from '@mui/material/Snackbar';
import type { ReactElement } from 'react';

import type { SnackbarProps } from '../../components/ui/types';

export default function Snackbar({
  open,
  onClose,
  children,
  autoHideDuration = 6000,
}: SnackbarProps) {
  return (
    <MuiSnackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      {children as ReactElement}
    </MuiSnackbar>
  );
}

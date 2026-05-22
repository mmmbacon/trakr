import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import type { LoadingOverlayProps } from '../../components/ui/types';

export default function LoadingOverlay({ open }: LoadingOverlayProps) {
  return (
    <Backdrop open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

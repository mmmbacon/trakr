import MuiAlert from '@mui/material/Alert';

import type { AlertProps } from '../../components/ui/types';

export default function Alert({
  children,
  severity = 'info',
  onClose,
  className,
  square,
}: AlertProps) {
  return (
    <MuiAlert
      severity={severity}
      onClose={onClose}
      className={className}
      sx={square ? { borderRadius: 0, flexShrink: 0 } : undefined}
    >
      {children}
    </MuiAlert>
  );
}

import MuiFab from '@mui/material/Fab';

import type { FabProps } from '../../components/ui/types';

export default function Fab({
  onClick,
  'aria-label': ariaLabel,
  children,
  className,
}: FabProps) {
  return (
    <MuiFab
      size="small"
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        bgcolor: 'background.paper',
        color: 'text.primary',
        border: 1,
        borderColor: 'divider',
        boxShadow: 'none',
        zIndex: 1,
        '&:hover': {
          bgcolor: 'action.hover',
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
        },
      }}
    >
      {children}
    </MuiFab>
  );
}

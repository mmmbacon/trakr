import MuiFab from '@mui/material/Fab';

import { colors } from '../../tokens';
import type { FabProps } from '../../components/ui/types';

export default function Fab({
  onClick,
  'aria-label': ariaLabel,
  children,
  className,
}: FabProps) {
  return (
    <MuiFab
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        bgcolor: colors.secondary,
        zIndex: 1,
        '&:hover': {
          bgcolor: '#3a9680',
        },
      }}
    >
      {children}
    </MuiFab>
  );
}

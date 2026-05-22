import MuiButton from '@mui/material/Button';
import type { ReactNode } from 'react';

interface NavButtonProps {
  onClick?: () => void;
  children?: ReactNode;
}

export default function NavButton({
  onClick = () => {},
  children,
}: NavButtonProps) {
  return (
    <MuiButton
      onClick={onClick}
      sx={{
        m: '4px',
        width: 44,
        height: 44,
        minWidth: 44,
        lineHeight: 0,
        p: 0,
      }}
    >
      {children}
    </MuiButton>
  );
}

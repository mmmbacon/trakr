import type { ReactNode } from 'react';
import Button from '@mui/material/Button';

interface SideBarButtonProps {
  onClick?: () => void;
  children?: ReactNode;
}

export const SideBarButton = ({
  onClick = () => {},
  children,
}: SideBarButtonProps) => (
  <Button
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
  </Button>
);

export default SideBarButton;

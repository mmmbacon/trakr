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
      m: '5px',
      width: '60px',
      height: '60px',
      lineHeight: '0em',
      minWidth: '30px',
    }}
  >
    {children}
  </Button>
);

export default SideBarButton;

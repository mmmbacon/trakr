import MuiButton from '@mui/material/Button';
import type { ElementType, ReactNode } from 'react';

interface NavButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  component?: ElementType;
  to?: string;
}

const navButtonSx = {
  m: '4px',
  width: 44,
  height: 44,
  minWidth: 44,
  lineHeight: 0,
  p: 0,
};

export default function NavButton({
  onClick,
  children,
  component,
  to,
}: NavButtonProps) {
  if (component) {
    return (
      <MuiButton component={component} to={to} sx={navButtonSx}>
        {children}
      </MuiButton>
    );
  }

  return (
    <MuiButton onClick={onClick ?? (() => {})} sx={navButtonSx}>
      {children}
    </MuiButton>
  );
}

import type { ReactNode } from 'react';

import { NavButton } from '../../components/ui';

interface SideBarButtonProps {
  onClick?: () => void;
  children?: ReactNode;
}

export const SideBarButton = ({
  onClick = () => {},
  children,
}: SideBarButtonProps) => (
  <NavButton onClick={onClick}>
    {children}
  </NavButton>
);

export default SideBarButton;

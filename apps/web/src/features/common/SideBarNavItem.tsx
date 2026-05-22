import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { NavButton, Tooltip } from '../../components/ui';

interface SideBarNavItemProps {
  title: string;
  to?: string;
  onClick?: () => void;
  children: ReactNode;
}

export default function SideBarNavItem({
  title,
  to,
  onClick,
  children,
}: SideBarNavItemProps) {
  const content = (
    <Tooltip title={title}>
      <span className="sidebar-nav-item">{children}</span>
    </Tooltip>
  );

  if (to) {
    return (
      <NavButton component={Link} to={to}>
        {content}
      </NavButton>
    );
  }

  return (
    <NavButton onClick={onClick}>
      {content}
    </NavButton>
  );
}

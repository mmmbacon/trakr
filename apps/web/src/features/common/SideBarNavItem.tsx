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
  const content = to ? (
    <Link to={to} className="link">
      {children}
    </Link>
  ) : (
    children
  );

  return (
    <NavButton onClick={onClick}>
      <Tooltip title={title}>
        <span className="sidebar-nav-item">{content}</span>
      </Tooltip>
    </NavButton>
  );
}

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

import { lightTooltipSlotProps } from '../../theme/tooltip';
import { SideBarButton } from './SideBarButton';

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
    <SideBarButton onClick={onClick}>
      <Tooltip
        title={title}
        aria-label={title}
        placement="right"
        slotProps={lightTooltipSlotProps}
      >
        <span className="sidebar-nav-item">{content}</span>
      </Tooltip>
    </SideBarButton>
  );
}

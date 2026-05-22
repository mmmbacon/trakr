import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

export const SIDEBAR_WIDTH = 240;

interface NavItem {
  label: string;
  icon: ReactNode;
  to?: string;
  onClick?: () => void;
  matchPath?: string;
  end?: boolean;
}

function isNavItemActive(pathname: string, item: NavItem): boolean {
  const matchPath = item.matchPath ?? item.to;
  if (!matchPath) {
    return false;
  }

  if (item.end || matchPath === '/dashboard') {
    return pathname === matchPath || pathname === `${matchPath}/`;
  }

  return pathname.startsWith(matchPath);
}

const SideBar = () => {
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      label: 'Job Board',
      icon: <DashboardIcon />,
      to: '/dashboard',
      matchPath: '/dashboard',
      end: true,
    },
    {
      label: 'Search Jobs',
      icon: <SearchIcon />,
      to: '/dashboard/search',
    },
    {
      label: 'Statistics',
      icon: <AssessmentIcon />,
      to: '/dashboard/job_stats',
    },
    {
      label: 'User Profile',
      icon: <PersonIcon />,
      to: '/dashboard/user_profile',
    },
    {
      label: 'Calendar',
      icon: <EventIcon />,
      onClick: () => { window.open('https://calendar.google.com/calendar/u/0/r', '_blank'); },
    },
  ];

  return (
    <Drawer
      variant="permanent"
      aria-label="Main navigation"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          position: 'relative',
          borderRight: 1,
          borderColor: 'divider',
        },
      }}
    >
      <Box display="flex" flexDirection="column" height="100%">
        <List component="nav" sx={{ flexGrow: 1, px: 1, pt: 1 }}>
          {navItems.map((item) => {
            const selected = isNavItemActive(location.pathname, item);

            return (
              <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={item.to ? Link : 'button'}
                  to={item.to}
                  type={item.to ? undefined : 'button'}
                  onClick={item.onClick}
                  selected={selected}
                  aria-label={item.label}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider />
      </Box>
    </Drawer>
  );
};

export default SideBar;

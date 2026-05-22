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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  projectsSelector,
  setActiveProjectKey,
} from '../../features/projects/projectsSlice';

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

export default function SideNav() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { projects, activeProjectKey } = useAppSelector(projectsSelector);

  const navItems: NavItem[] = [
    {
      label: 'Board',
      icon: <DashboardIcon />,
      to: '/dashboard',
      matchPath: '/dashboard',
      end: true,
    },
    {
      label: 'Profile',
      icon: <PersonIcon />,
      to: '/dashboard/user_profile',
    },
    {
      label: 'Settings',
      icon: <SettingsIcon />,
      to: '/dashboard/user_profile',
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
        {projects.length > 0 ? (
          <Box px={2} pt={2} pb={1}>
            <Select
              fullWidth
              size="small"
              value={activeProjectKey ?? ''}
              onChange={(event) => dispatch(setActiveProjectKey(event.target.value))}
              aria-label="Project"
            >
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.key}>
                  {project.key} — {project.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ) : null}
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
}

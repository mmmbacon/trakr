import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  projectBoardPath,
  projectListPath,
} from '../../features/projects/projectRoutes';
import {
  projectsSelector,
  setActiveProjectKey,
} from '../../features/projects/projectsSlice';

export const SIDEBAR_WIDTH = 200;

type BackgroundView = 'board' | 'list';

interface NavItem {
  label: string;
  icon: ReactNode;
  to?: string;
  matchPath?: string;
  selected?: boolean;
}

function isNavItemActive(pathname: string, item: NavItem): boolean {
  const matchPath = item.matchPath ?? item.to;
  if (!matchPath) {
    return false;
  }
  return pathname.startsWith(matchPath);
}

export default function SideNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { projects, activeProjectKey } = useAppSelector(projectsSelector);

  const projectKey = activeProjectKey ?? projects[0]?.key;

  const fromView = (location.state as { from?: BackgroundView } | null)?.from;

  const isBoardView = projectKey
    ? location.pathname.startsWith(projectBoardPath(projectKey))
      || (location.pathname.includes(`/projects/${projectKey}/issues/`) && fromView !== 'list')
    : false;

  const isListView = projectKey
    ? location.pathname.startsWith(projectListPath(projectKey))
      || (location.pathname.includes(`/projects/${projectKey}/issues/`) && fromView === 'list')
    : false;

  const navItems: NavItem[] = projectKey
    ? [
      {
        label: 'Board',
        icon: <DashboardIcon />,
        to: projectBoardPath(projectKey),
        matchPath: projectBoardPath(projectKey),
        selected: isBoardView && !isListView,
      },
      {
        label: 'List',
        icon: <ListIcon />,
        to: projectListPath(projectKey),
        matchPath: projectListPath(projectKey),
        selected: isListView,
      },
    ]
    : [];

  const handleProjectChange = (key: string) => {
    dispatch(setActiveProjectKey(key));
    navigate(projectBoardPath(key));
  };

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
          <Box px={1} pt={1} pb={0.5}>
            <Select
              fullWidth
              size="small"
              value={activeProjectKey ?? ''}
              onChange={(event) => handleProjectChange(event.target.value)}
              aria-label="Project"
              renderValue={(value) => {
                const project = projects.find((item) => item.key === value);
                if (!project) {
                  return value;
                }
                return (
                  <Box
                    component="span"
                    sx={{
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontSize: '0.75rem',
                      lineHeight: 1.35,
                    }}
                  >
                    <Box
                      component="span"
                      sx={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}
                    >
                      {project.key}
                    </Box>
                    {' — '}
                    {project.name}
                  </Box>
                );
              }}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'text.disabled',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderWidth: 1,
                },
              }}
            >
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.key}>
                  {project.key} — {project.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ) : null}
        <List component="nav" dense sx={{ flexGrow: 1, px: 0.75, pt: 0.5 }}>
          {navItems.map((item) => {
            const selected = item.selected ?? isNavItemActive(location.pathname, item);

            return (
              <ListItem key={item.label} disablePadding sx={{ mb: 0.25 }}>
                <ListItemButton
                  component={Link}
                  to={item.to ?? '#'}
                  selected={selected}
                  aria-label={item.label}
                  dense
                >
                  <ListItemIcon sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider />
        <List component="nav" dense sx={{ px: 0.75, pb: 0.5 }}>
          <ListItem disablePadding sx={{ mb: 0.25 }}>
            <ListItemButton
              component={Link}
              to="/dashboard/user_profile"
              selected={location.pathname.startsWith('/dashboard/user_profile')}
              aria-label="Profile"
              dense
            >
              <ListItemIcon sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 0.25 }}>
            <ListItemButton
              component={Link}
              to="/dashboard/user_profile"
              selected={false}
              aria-label="Settings"
              dense
            >
              <ListItemIcon sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

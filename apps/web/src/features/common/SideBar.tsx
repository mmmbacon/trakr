import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';

import { logout, authSelector } from '../auth/authSlice';
import { SideBarButton } from './SideBarButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const SIDEBAR_WIDTH = 76;

const lightTooltipSlotProps = {
  tooltip: {
    sx: {
      backgroundColor: 'common.white',
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: 1,
      fontSize: 11,
    },
  },
};

interface SideBarUserData {
  first_name?: string;
  last_name?: string;
  email?: string;
}

interface SideBarProps {
  userdata?: SideBarUserData;
  addButtonVisible?: boolean;
  onAddJobClick?: () => void;
}

const defaultUserdata: SideBarUserData = {
  first_name: 'Dave',
  last_name: 'Smith',
  email: 'dave.smith@email.com',
};

const SideBar = ({
  userdata = defaultUserdata,
  addButtonVisible = false,
  onAddJobClick,
}: SideBarProps) => {
  const { user } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  const handleClickOpen = () => {
    if (onAddJobClick) {
      onAddJobClick();
    }
  };

  return (
    <Box
      id="sidebar"
      className="dashboard-sidebar"
      aria-label="Sidebar navigation"
      sx={{
        flex: `0 0 ${SIDEBAR_WIDTH}px`,
        width: SIDEBAR_WIDTH,
        minWidth: SIDEBAR_WIDTH,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Paper
        elevation={1}
        square
        sx={{
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box display="flex" flexGrow={1} flexDirection="column" height="100%" alignItems="center">
          <Tooltip
            title="Dashboard"
            aria-label="Dashboard"
            placement="right"
            slotProps={lightTooltipSlotProps}
          >
            <Link to="/dashboard">
              <Box
                component="img"
                src="../../img/Logo2-sm.png"
                alt="logo"
                width="45px"
                sx={{ p: '10px', mt: '5px' }}
              />
            </Link>
          </Tooltip>
          <Box display="flex" flexGrow={1} flexDirection="column" justifyContent="space-between">
            <Box display="flex" flexDirection="column">
              <SideBarButton>
                <Tooltip
                  title="User Profile"
                  aria-label="User Profile"
                  placement="right"
                  slotProps={lightTooltipSlotProps}
                >
                  <Link to="/dashboard/user_profile" className="link">
                    <Box
                      component="img"
                      src={`https://ui-avatars.com/api/?name=${userdata.first_name}+${userdata.last_name}&background=3b3b3b&color=fff`}
                      alt="initials"
                      sx={{
                        borderRadius: '50%',
                        width: '45px',
                        height: '45px',
                      }}
                    />
                  </Link>
                </Tooltip>
              </SideBarButton>
              <SideBarButton>
                <Tooltip
                  title="Statistics"
                  aria-label="Statistics"
                  placement="right"
                  slotProps={lightTooltipSlotProps}
                >
                  <Link to="/dashboard/job_stats" className="link">
                    <AssessmentIcon sx={{ fontSize: '45px', color: '#3b3b3b' }} />
                  </Link>
                </Tooltip>
              </SideBarButton>
              <SideBarButton onClick={() => { window.open('https://calendar.google.com/calendar/u/0/r', '_blank'); }}>
                <Tooltip
                  title="Open Calendar"
                  aria-label="Open Calendar"
                  placement="right"
                  slotProps={lightTooltipSlotProps}
                >
                  <EventIcon sx={{ fontSize: '45px', color: '#3b3b3b' }} />
                </Tooltip>
              </SideBarButton>
              <SideBarButton>
                <Tooltip
                  title="Search Jobs"
                  aria-label="Search Jobs"
                  placement="right"
                  slotProps={lightTooltipSlotProps}
                >
                  <Link to="/dashboard/search" className="link">
                    <SearchIcon sx={{ fontSize: '45px', color: '#3b3b3b' }} />
                  </Link>
                </Tooltip>
              </SideBarButton>
              {addButtonVisible ? (
                <SideBarButton onClick={handleClickOpen}>
                  <Tooltip
                    title="Add New Job"
                    aria-label="Add New Job"
                    placement="right"
                    slotProps={lightTooltipSlotProps}
                  >
                    <AddIcon sx={{ fontSize: '45px', color: '#3b3b3b' }} />
                  </Tooltip>
                </SideBarButton>
              ) : null}
            </Box>
            <Box pb={2}>
              <SideBarButton onClick={handleLogOut}>
                <Tooltip
                  title="Log Out"
                  aria-label="Log Out"
                  placement="right"
                  slotProps={lightTooltipSlotProps}
                >
                  <Link to={`/users/${user?.id ?? ''}`}>
                    <ExitToAppIcon
                      sx={{
                        fontSize: '45px',
                        color: '#3b3b3b',
                        transform: 'rotate(180deg)',
                      }}
                    />
                  </Link>
                </Tooltip>
              </SideBarButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SideBar;

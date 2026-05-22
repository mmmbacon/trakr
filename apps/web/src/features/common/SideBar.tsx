import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';

import { lightTooltipSlotProps } from '../../theme/tooltip';
import { logout } from '../auth/authSlice';
import SideBarNavItem from './SideBarNavItem';
import { useAppDispatch } from '../../app/hooks';

export const SIDEBAR_WIDTH = 52;

const SIDEBAR_ICON_SIZE = 24;
const SIDEBAR_LOGO_SIZE = 32;

const navIconSx = { fontSize: SIDEBAR_ICON_SIZE, color: '#3b3b3b' };

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await dispatch(logout());
    navigate('/login');
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
                src="/img/Logo2-sm.png"
                alt="logo"
                width={SIDEBAR_LOGO_SIZE}
                sx={{ p: '6px', mt: '4px' }}
              />
            </Link>
          </Tooltip>
          <Box display="flex" flexGrow={1} flexDirection="column" justifyContent="space-between">
            <Box display="flex" flexDirection="column">
              <SideBarNavItem title="User Profile" to="/dashboard/user_profile">
                <Box
                  component="img"
                  src={`https://ui-avatars.com/api/?name=${userdata.first_name}+${userdata.last_name}&background=3b3b3b&color=fff&size=${SIDEBAR_ICON_SIZE}`}
                  alt="initials"
                  sx={{
                    borderRadius: '50%',
                    width: SIDEBAR_ICON_SIZE,
                    height: SIDEBAR_ICON_SIZE,
                    display: 'block',
                  }}
                />
              </SideBarNavItem>
              <SideBarNavItem title="Statistics" to="/dashboard/job_stats">
                <AssessmentIcon sx={navIconSx} />
              </SideBarNavItem>
              <SideBarNavItem
                title="Open Calendar"
                onClick={() => { window.open('https://calendar.google.com/calendar/u/0/r', '_blank'); }}
              >
                <EventIcon sx={navIconSx} />
              </SideBarNavItem>
              <SideBarNavItem title="Search Jobs" to="/dashboard/search">
                <SearchIcon sx={navIconSx} />
              </SideBarNavItem>
              {addButtonVisible ? (
                <SideBarNavItem title="Add New Job" onClick={onAddJobClick}>
                  <AddIcon sx={navIconSx} />
                </SideBarNavItem>
              ) : null}
            </Box>
            <Box pb={2}>
              <SideBarNavItem title="Log Out" onClick={handleLogOut}>
                <ExitToAppIcon
                  sx={{
                    ...navIconSx,
                    transform: 'rotate(180deg)',
                  }}
                />
              </SideBarNavItem>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SideBar;

import { Link, useNavigate } from 'react-router-dom';

import { logout } from '../auth/authSlice';
import SideBarNavItem from './SideBarNavItem';
import { useAppDispatch } from '../../app/hooks';
import { Box, Icon, Paper, Tooltip } from '../../components/ui';

export const SIDEBAR_WIDTH = 52;

const SIDEBAR_ICON_SIZE = 24;
const SIDEBAR_LOGO_SIZE = 32;

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
    >
      <Paper elevation={1} square className="dashboard-sidebar-paper">
        <Box display="flex" flexGrow={1} flexDirection="column" height="100%" alignItems="center">
          <Tooltip title="Dashboard">
            <Link to="/dashboard">
              <Box
                component="img"
                src="/img/Logo2-sm.png"
                alt="logo"
                width={SIDEBAR_LOGO_SIZE}
                className="dashboard-sidebar-logo"
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
                  className="dashboard-sidebar-avatar"
                />
              </SideBarNavItem>
              <SideBarNavItem title="Statistics" to="/dashboard/job_stats">
                <Icon name="assessment" className="sidebar-nav-icon" />
              </SideBarNavItem>
              <SideBarNavItem
                title="Open Calendar"
                onClick={() => { window.open('https://calendar.google.com/calendar/u/0/r', '_blank'); }}
              >
                <Icon name="event" className="sidebar-nav-icon" />
              </SideBarNavItem>
              <SideBarNavItem title="Search Jobs" to="/dashboard/search">
                <Icon name="search" className="sidebar-nav-icon" />
              </SideBarNavItem>
              {addButtonVisible ? (
                <SideBarNavItem title="Add New Job" onClick={onAddJobClick}>
                  <Icon name="add" className="sidebar-nav-icon" />
                </SideBarNavItem>
              ) : null}
            </Box>
            <Box pb={2}>
              <SideBarNavItem title="Log Out" onClick={handleLogOut}>
                <Icon name="exit" className="sidebar-nav-icon sidebar-nav-icon--exit" />
              </SideBarNavItem>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SideBar;

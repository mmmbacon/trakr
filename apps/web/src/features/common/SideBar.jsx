import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Paper, withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import EventIcon from '@material-ui/icons/Event';
import SearchIcon from '@material-ui/icons/Search';
import AssessmentIcon from '@material-ui/icons/Assessment';

import { logout, authSelector } from '../auth/authSlice';
import { SideBarButton } from './SideBarButton';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const useStyles = makeStyles({
  paper: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    color: 'black',
  },
  icon: {
    fontSize: '45px',
    color: '#3b3b3b',
  },
  imgicon: {
    padding: '10px',
    marginTop: '5px',
  },
  initialsicon: {
    borderRadius: '50%',
    width: '45px',
    height: '45px',
  },
  rotate: {
    transform: 'rotate(180deg)',
  },
});

const SideBar = (props) => {
  const classes = useStyles();
  const { userdata, addButtonVisible, onAddJobClick } = props;
  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  const handleClickOpen = () => {
    if (onAddJobClick) {
      onAddJobClick();
    }
  };

  return (
    <Box id="sidebar" className="dashboard-sidebar" aria-label="Sidebar navigation">
      <Paper elevation={1} square className={classes.paper}>
        <Box display="flex" flexGrow={1} flexDirection="column" height="100%" alignItems="center">
          <LightTooltip title="Dashboard" aria-label="Dashboard" placement="right">
            <Link to="/dashboard">
              <img src="/img/Logo2-sm.png" alt="logo" width="45px" className={classes.imgicon} />
            </Link>
          </LightTooltip>
          <Box display="flex" flexGrow={1} flexDirection="column" justifyContent="space-between">
            <Box display="flex" flexDirection="column">

              <SideBarButton>
                <LightTooltip title="User Profile" aria-label="User Profile" placement="right">
                  <Link to="/dashboard/user_profile" className="link">
                    <img src={`https://ui-avatars.com/api/?name=${userdata.first_name}+${userdata.last_name}&background=3b3b3b&color=fff`} alt="initials" className={classes.initialsicon} />
                  </Link>
                </LightTooltip>
              </SideBarButton>
              <SideBarButton>
                <LightTooltip title="Statistics" aria-label="Statistics" placement="right">
                  <Link to="/dashboard/job_stats" className="link">
                    <AssessmentIcon className={`${classes.icon} ${classes.add}`} />
                  </Link>
                </LightTooltip>
              </SideBarButton>
              <SideBarButton onClick={() => { window.open('https://calendar.google.com/calendar/u/0/r', '_blank'); }}>
                <LightTooltip title="Open Calendar" aria-label="Open Calendar" placement="right">
                  <EventIcon className={`${classes.icon} ${classes.add}`} />
                </LightTooltip>
              </SideBarButton>
              <SideBarButton>
                <LightTooltip title="Search Jobs" aria-label="Search Jobs" placement="right">
                  <Link to="/dashboard/search" className="link">
                    <SearchIcon className={`${classes.icon} ${classes.add}`} />
                  </Link>
                </LightTooltip>
              </SideBarButton>
              { addButtonVisible
                ? (
                  <SideBarButton onClick={handleClickOpen}>
                    <LightTooltip title="Add New Job" aria-label="Add New Job" placement="right">
                      <AddIcon className={`${classes.icon} ${classes.add}`} />
                    </LightTooltip>
                  </SideBarButton>
                )
                : null}
            </Box>
            <Box pb={2}>
              <SideBarButton onClick={handleLogOut}>
                <LightTooltip title="Log Out" aria-label="Log Out" placement="right">
                  <Link to={`/users/${user.id}`}>
                    <ExitToAppIcon className={`${classes.icon} ${classes.rotate}`} />
                  </Link>
                </LightTooltip>
              </SideBarButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

SideBar.propTypes = {
  userdata: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
  }),
  addButtonVisible: PropTypes.bool,
  onAddJobClick: PropTypes.func,
};

SideBar.defaultProps = {
  userdata: {
    first_name: 'Dave',
    last_name: 'Smith',
    email: 'dave.smith@email.com',
  },
  addButtonVisible: false,
  onAddJobClick: undefined,
};

export default SideBar;

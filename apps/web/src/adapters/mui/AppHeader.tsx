import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import ColorModeToggle from '../../features/common/ColorModeToggle';
import UserMenu from './UserMenu';

interface AppHeaderUserData {
  first_name?: string;
  last_name?: string;
}

interface AppHeaderProps {
  userdata?: AppHeaderUserData;
  onLogout: () => void;
  projectName?: string;
}

export default function AppHeader({ userdata, onLogout, projectName }: AppHeaderProps) {
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar variant="dense" disableGutters sx={{ px: 1.5, minHeight: 44 }}>
        <Box
          component={Link}
          to="/dashboard"
          display="flex"
          alignItems="center"
          gap={1}
          color="inherit"
          sx={{ textDecoration: 'none' }}
        >
          <Box
            component="img"
            src="/img/Logo2-sm.png"
            alt=""
            sx={{ width: 26, height: 26 }}
          />
          <Typography variant="h6" component="span" color="inherit" sx={{ fontSize: '0.9375rem' }}>
            trakr.
          </Typography>
          {projectName ? (
            <Typography variant="caption" component="span" color="text.secondary" sx={{ ml: 0.5 }}>
              / {projectName}
            </Typography>
          ) : null}
        </Box>

        <Box flexGrow={1} />

        <ColorModeToggle />
        <UserMenu
          firstName={userdata?.first_name}
          lastName={userdata?.last_name}
          onLogout={onLogout}
        />
      </Toolbar>
    </AppBar>
  );
}

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
}

export default function AppHeader({ userdata, onLogout }: AppHeaderProps) {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Box
          component={Link}
          to="/dashboard"
          display="flex"
          alignItems="center"
          gap={1.5}
          color="inherit"
          sx={{ textDecoration: 'none' }}
        >
          <Box
            component="img"
            src="/img/Logo2-sm.png"
            alt=""
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="h6" component="span" color="inherit">
            trakr.
          </Typography>
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

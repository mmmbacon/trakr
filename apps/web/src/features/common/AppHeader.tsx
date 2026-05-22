import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';

interface AppHeaderUserData {
  first_name?: string;
  last_name?: string;
}

interface AppHeaderProps {
  userdata?: AppHeaderUserData;
  onLogout: () => void;
}

export default function AppHeader({ userdata, onLogout }: AppHeaderProps) {
  const displayName = [userdata?.first_name, userdata?.last_name].filter(Boolean).join(' ');
  const initials = `${userdata?.first_name?.[0] ?? ''}${userdata?.last_name?.[0] ?? ''}`;

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

        {displayName ? (
          <Box display="flex" alignItems="center" gap={1} mr={1}>
            <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
              {initials}
            </Avatar>
            <Typography variant="body2" color="text.primary" sx={{ display: { xs: 'none', sm: 'block' } }}>
              {displayName}
            </Typography>
          </Box>
        ) : null}

        <IconButton
          aria-label="Log out"
          onClick={onLogout}
          color="inherit"
          sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
        >
          <LogoutIcon />
        </IconButton>
        <Button
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
        >
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
}

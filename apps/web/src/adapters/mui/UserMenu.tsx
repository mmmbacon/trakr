import { useId, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';

interface UserMenuProps {
  firstName?: string;
  lastName?: string;
  onLogout: () => void;
}

export default function UserMenu({ firstName, lastName, onLogout }: UserMenuProps) {
  const menuId = useId();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const displayName = [firstName, lastName].filter(Boolean).join(' ');
  const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`;

  if (!displayName && !initials) {
    return null;
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    onLogout();
  };

  return (
    <>
      <Button
        size="small"
        color="inherit"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-label={`Account menu for ${displayName || 'user'}`}
        sx={{ textTransform: 'none', gap: 0.75, px: 0.75, py: 0.25, minHeight: 28 }}
      >
        <Avatar sx={{ width: 24, height: 24, fontSize: 11 }}>
          {initials}
        </Avatar>
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
          {displayName}
        </Box>
        <KeyboardArrowDownIcon fontSize="small" />
      </Button>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Log out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

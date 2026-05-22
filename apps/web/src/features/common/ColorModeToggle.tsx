import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useColorMode } from './colorModeContext';

export default function ColorModeToggle() {
  const { mode, toggleColorMode } = useColorMode();
  const isDark = mode === 'dark';

  return (
    <Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
      <IconButton
        color="inherit"
        onClick={toggleColorMode}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
}

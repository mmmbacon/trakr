import MuiDrawer from '@mui/material/Drawer';

import type { DrawerProps } from '../../components/ui/types';

export default function Drawer({
  open,
  onClose,
  anchor = 'right',
  children,
}: DrawerProps) {
  return (
    <MuiDrawer anchor={anchor} open={open} onClose={onClose}>
      {children}
    </MuiDrawer>
  );
}

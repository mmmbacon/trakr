import MuiDivider from '@mui/material/Divider';

import type { DividerProps } from '../../components/ui/types';

export default function Divider({ children, className, marginBottom }: DividerProps) {
  return (
    <MuiDivider className={className} sx={marginBottom !== undefined ? { mb: marginBottom } : undefined}>
      {children}
    </MuiDivider>
  );
}

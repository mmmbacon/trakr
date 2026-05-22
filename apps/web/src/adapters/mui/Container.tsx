import MuiContainer from '@mui/material/Container';

import type { ContainerProps } from '../../components/ui/types';

export default function Container({
  children,
  maxWidth = 'lg',
  className,
  paddingTop,
  paddingX,
}: ContainerProps) {
  return (
    <MuiContainer
      maxWidth={maxWidth}
      className={className}
      sx={{
        width: '100%',
        pt: paddingTop,
        px: paddingX,
      }}
    >
      {children}
    </MuiContainer>
  );
}

import MuiGrid from '@mui/material/Grid';

import type { GridProps } from '../../components/ui/types';

export default function Grid({
  children,
  container,
  item,
  spacing,
  wrap,
  className,
  id,
  component,
  'aria-label': ariaLabel,
  minWidth,
  flex,
  maxWidth,
}: GridProps) {
  const sharedProps = {
    container,
    item,
    spacing,
    wrap,
    className,
    id,
    'aria-label': ariaLabel,
    sx: { minWidth, flex, maxWidth },
  };

  if (component) {
    return (
      <MuiGrid component={component} {...sharedProps}>
        {children}
      </MuiGrid>
    );
  }

  return (
    <MuiGrid {...sharedProps}>
      {children}
    </MuiGrid>
  );
}

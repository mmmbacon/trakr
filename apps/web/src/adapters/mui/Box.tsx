import MuiBox from '@mui/material/Box';

import type { BoxProps } from '../../components/ui/types';
import { spacingProps } from './spacing';

export default function Box({
  children,
  className,
  id,
  role,
  component,
  display,
  flexDirection,
  alignItems,
  justifyContent,
  alignContent,
  flex,
  flexGrow,
  flexShrink,
  minWidth,
  minHeight,
  width,
  height,
  gap,
  overflow,
  position,
  borderRadius,
  src,
  alt,
  href,
  target,
  rel,
  onClick,
  onKeyDown,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...spacing
}: BoxProps) {
  const sharedProps = {
    className,
    id,
    role,
    display,
    flexDirection,
    alignItems,
    justifyContent,
    alignContent,
    flex,
    flexGrow,
    flexShrink,
    minWidth,
    minHeight,
    width,
    height,
    gap,
    overflow,
    position,
    borderRadius,
    src,
    alt,
    href,
    target,
    rel,
    onClick,
    onKeyDown,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...spacingProps(spacing),
  };

  if (component) {
    return (
      <MuiBox component={component} {...sharedProps}>
        {children}
      </MuiBox>
    );
  }

  return (
    <MuiBox {...sharedProps}>
      {children}
    </MuiBox>
  );
}

import MuiTypography from '@mui/material/Typography';

import type { TypographyProps } from '../../components/ui/types';

export default function Typography({
  children,
  id,
  variant = 'body1',
  component,
  className,
  color,
  align,
  noWrap,
  marginTop,
  marginBottom,
  marginLeft,
  fontWeight,
  style,
}: TypographyProps) {
  const sharedProps = {
    id,
    variant,
    className,
    color,
    align,
    noWrap,
    style,
    sx: {
      mt: marginTop,
      mb: marginBottom,
      ml: marginLeft,
      fontWeight,
    },
  };

  if (component) {
    return (
      <MuiTypography component={component} {...sharedProps}>
        {children}
      </MuiTypography>
    );
  }

  return (
    <MuiTypography {...sharedProps}>
      {children}
    </MuiTypography>
  );
}

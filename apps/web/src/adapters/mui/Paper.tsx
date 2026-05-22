import MuiPaper from '@mui/material/Paper';

import type { PaperProps } from '../../components/ui/types';

export default function Paper({
  children,
  className,
  elevation = 1,
  variant,
  square,
  component,
  'aria-label': ariaLabel,
}: PaperProps) {
  const sharedProps = {
    className,
    elevation,
    variant,
    square,
    'aria-label': ariaLabel,
  };

  if (component) {
    return (
      <MuiPaper component={component} {...sharedProps}>
        {children}
      </MuiPaper>
    );
  }

  return (
    <MuiPaper {...sharedProps}>
      {children}
    </MuiPaper>
  );
}

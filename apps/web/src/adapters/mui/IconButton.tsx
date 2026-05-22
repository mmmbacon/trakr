import MuiIconButton from '@mui/material/IconButton';

import type { IconButtonProps } from '../../components/ui/types';

export default function IconButton({
  'aria-label': ariaLabel,
  onClick,
  href,
  target,
  rel,
  children,
  className,
  edge,
}: IconButtonProps) {
  const sharedProps = {
    'aria-label': ariaLabel,
    className,
    edge,
    size: 'small' as const,
    sx: { color: '#d9d9d9', p: 0.25 },
  };

  if (href) {
    return (
      <MuiIconButton
        {...sharedProps}
        href={href}
        target={target}
        rel={rel}
      >
        {children}
      </MuiIconButton>
    );
  }

  return (
    <MuiIconButton {...sharedProps} onClick={onClick}>
      {children}
    </MuiIconButton>
  );
}

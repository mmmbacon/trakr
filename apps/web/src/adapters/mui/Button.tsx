import MuiButton from '@mui/material/Button';

import { colors } from '../../tokens';
import type { ButtonColor, ButtonProps } from '../../components/ui/types';

const colorMap: Record<ButtonColor, { muiColor?: 'primary' | 'secondary'; sx?: object }> = {
  primary: { muiColor: 'primary' },
  secondary: { muiColor: 'secondary', sx: { color: colors.white } },
  danger: { sx: { backgroundColor: colors.error, color: colors.white } },
  neutral: { sx: { backgroundColor: colors.neutral, color: colors.white } },
};

export default function Button({
  children,
  variant = 'contained',
  color = 'primary',
  onClick,
  type = 'button',
  disabled,
  fullWidth,
  startIcon,
  className,
}: ButtonProps) {
  const mapped = colorMap[color];

  return (
    <MuiButton
      size="small"
      variant={variant}
      color={mapped.muiColor}
      disableElevation={variant === 'contained'}
      onClick={onClick}
      type={type}
      disabled={disabled}
      fullWidth={fullWidth}
      startIcon={startIcon}
      className={className}
      sx={{
        ...(variant === 'contained' ? { boxShadow: 'none', '&:hover': { boxShadow: 'none' } } : {}),
        ...mapped.sx,
      }}
    >
      {children}
    </MuiButton>
  );
}

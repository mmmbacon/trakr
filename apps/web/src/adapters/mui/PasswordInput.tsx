import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import Icon from './Icon';
import IconButton from './IconButton';

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  marginBottom?: number;
}

export default function PasswordInput({
  label,
  value,
  onChange,
  className,
  marginBottom,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      label={label}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      size="small"
      margin="dense"
      fullWidth
      className={className}
      sx={marginBottom !== undefined ? { mb: marginBottom } : undefined}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                aria-pressed={showPassword}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Icon name={showPassword ? 'visibility' : 'visibility-off'} />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

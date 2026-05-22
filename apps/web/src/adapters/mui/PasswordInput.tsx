import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import Icon from './Icon';

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
    <FormControl fullWidth className={className}>
      <TextField
        label={label}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        sx={marginBottom !== undefined ? { mb: marginBottom } : undefined}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <button
                  type="button"
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    padding: 0,
                  }}
                >
                  <Icon name={showPassword ? 'visibility' : 'visibility-off'} />
                </button>
              </InputAdornment>
            ),
          },
        }}
      />
    </FormControl>
  );
}

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import type { TextFieldProps } from '../../components/ui/types';

export default function TextInput({
  id,
  label,
  name,
  value,
  onChange,
  type = 'text',
  required,
  fullWidth = true,
  multiline,
  maxRows,
  className,
  marginBottom,
  startAdornment,
  inputMode,
  min,
}: TextFieldProps) {
  return (
    <TextField
      id={id}
      label={label}
      name={name ?? label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      type={type}
      required={required}
      fullWidth={fullWidth}
      multiline={multiline}
      maxRows={maxRows}
      size="small"
      margin="dense"
      className={className}
      inputProps={{ inputMode, min }}
      sx={marginBottom !== undefined ? { mb: marginBottom } : undefined}
      slotProps={
        startAdornment
          ? {
              input: {
                startAdornment: (
                  <InputAdornment position="start">{startAdornment}</InputAdornment>
                ),
              },
            }
          : undefined
      }
    />
  );
}

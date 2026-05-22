import type { ChangeEventHandler } from 'react';
import TextField from '@mui/material/TextField';

interface InputProps {
  name: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export default function Input({
  name,
  label,
  value,
  onChange,
}: InputProps) {
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

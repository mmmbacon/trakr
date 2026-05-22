import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select';

import type { SelectFieldProps } from '../../components/ui/types';

export default function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  emptyOption,
  className,
  marginLeft,
  width,
  marginBottom,
}: SelectFieldProps) {
  return (
    <FormControl
      variant="outlined"
      fullWidth
      size="small"
      margin="dense"
      className={className}
      sx={{
        ml: marginLeft,
        width,
        mb: marginBottom,
      }}
    >
      <InputLabel htmlFor={id} size="small">{label}</InputLabel>
      <MuiSelect
        native
        size="small"
        value={String(value)}
        onChange={(event) => onChange(event.target.value)}
        label={label}
        inputProps={{
          name: label,
          id,
        }}
      >
        {emptyOption ? <option aria-label="None" value="" /> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </MuiSelect>
    </FormControl>
  );
}

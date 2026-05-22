import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import type { SearchFieldProps } from '../../components/ui/types';
import Icon from './Icon';

export default function SearchField({
  id = 'search-input',
  label,
  value,
  onChange,
  onClear,
  className,
  marginBottom,
}: SearchFieldProps) {
  return (
    <FormControl variant="outlined" className={className} sx={{ flexGrow: 1 }}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        fullWidth
        label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        endAdornment={(
          <InputAdornment position="end">
            {value ? (
              <IconButton
                onClick={() => {
                  onChange('');
                  onClear?.();
                }}
                edge="end"
                aria-label="clear search"
              >
                <Icon name="clear" />
              </IconButton>
            ) : (
              <Icon name="search" />
            )}
          </InputAdornment>
        )}
        sx={{
          mb: marginBottom,
          bgcolor: 'white',
        }}
      />
    </FormControl>
  );
}

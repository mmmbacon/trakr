import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import type { DateFieldProps } from '../../components/ui/types';

export default function DateField({
  id = 'date-picker-inline',
  label,
  value,
  onChange,
  className,
}: DateFieldProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        className={className}
        slotProps={{
          textField: {
            fullWidth: true,
            margin: 'normal',
            id,
          },
        }}
      />
    </LocalizationProvider>
  );
}

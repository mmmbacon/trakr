import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

import LinkInput from '../../../components/LinkInput';
import type { JobFormValues } from './useJobForm';

interface JobFormDetailsProps {
  values: JobFormValues;
  onFieldChange: <K extends keyof JobFormValues>(field: K, value: JobFormValues[K]) => void;
  compact?: boolean;
}

export default function JobFormDetails({
  values,
  onFieldChange,
  compact = false,
}: JobFormDetailsProps) {
  if (!compact) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between" mb={1}>
      <Box flexGrow={1} mr={1}>
        <LinkInput
          id="location-input"
          label="Location"
          name="location"
          value={values.location}
          onChange={(value) => onFieldChange('location', value)}
          action="maps"
          ariaLabel="click event location"
        />
      </Box>
      <Box flexGrow={1} mr={1}>
        <LinkInput
          id="url-input"
          label="Job Link Url"
          name="url"
          value={values.url}
          onChange={(value) => onFieldChange('url', value)}
          action="open"
          ariaLabel="click url"
        />
      </Box>
      <Box width="33.33%">
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="salary-input">Salary</InputLabel>
          <OutlinedInput
            id="salary-input"
            type="number"
            inputProps={{ inputMode: 'numeric', min: 0 }}
            value={values.salary > 0 ? values.salary : ''}
            label="Salary"
            name="salary"
            onChange={(event) => {
              const val = event.target.value;
              onFieldChange('salary', val === '' ? 0 : Number.parseInt(val, 10));
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </Box>
    </Box>
  );
}

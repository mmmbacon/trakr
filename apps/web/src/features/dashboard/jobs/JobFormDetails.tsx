import LinkInput from '../../../components/LinkInput';
import { Box, TextInput } from '../../../components/ui';
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
        <TextInput
          id="salary-input"
          label="Salary"
          name="salary"
          type="number"
          inputMode="numeric"
          min={0}
          value={values.salary > 0 ? values.salary : ''}
          onChange={(value) => {
            onFieldChange('salary', value === '' ? 0 : Number.parseInt(value, 10));
          }}
          startAdornment="$"
        />
      </Box>
    </Box>
  );
}

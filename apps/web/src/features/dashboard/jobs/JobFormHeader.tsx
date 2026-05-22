import {
  Box,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import { JOB_STATUS_OPTIONS } from './constants';
import { useCompanyLogo } from './useCompanyLogo';
import type { JobFormValues } from './useJobForm';
import JobFormDetails from './JobFormDetails';

interface JobFormHeaderProps {
  values: JobFormValues;
  onFieldChange: <K extends keyof JobFormValues>(field: K, value: JobFormValues[K]) => void;
}

export default function JobFormHeader({ values, onFieldChange }: JobFormHeaderProps) {
  const logo = useCompanyLogo(values.company);

  const handleStatusChange = (event: SelectChangeEvent<number>) => {
    onFieldChange('status', Number(event.target.value));
  };

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box
          component="img"
          src={logo}
          alt=""
          sx={{
            width: 100,
            height: 100,
            mr: 1.875,
          }}
        />
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Box display="flex" flexDirection="row" justifyContent="space-between" mb={1}>
            <Box flexGrow={1} mr={1}>
              <TextField
                fullWidth
                required
                id="job-company-name"
                label="Company Name"
                name="company"
                value={values.company}
                onChange={(event) => onFieldChange('company', event.target.value)}
              />
            </Box>
            <Box flexGrow={1} mr={1}>
              <TextField
                fullWidth
                required
                id="job-title"
                label="Job Title"
                name="title"
                value={values.title}
                onChange={(event) => onFieldChange('title', event.target.value)}
              />
            </Box>
            <Box width="33.33%">
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-status-native-simple">
                  Status
                </InputLabel>
                <Select
                  native
                  value={values.status}
                  onChange={handleStatusChange}
                  label="Status"
                  inputProps={{
                    name: 'status',
                    id: 'outlined-status-native-simple',
                  }}
                >
                  {JOB_STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <JobFormDetails values={values} onFieldChange={onFieldChange} compact />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row">
        <TextField
          fullWidth
          id="job-details"
          multiline
          label="Details"
          name="details"
          value={values.details}
          onChange={(event) => onFieldChange('details', event.target.value)}
        />
      </Box>
    </>
  );
}

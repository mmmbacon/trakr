import { JOB_STATUS_OPTIONS } from './constants';
import { useCompanyLogo } from './useCompanyLogo';
import { Box, SelectField, TextInput } from '../../../components/ui';
import type { JobFormValues } from './useJobForm';
import JobFormDetails from './JobFormDetails';

interface JobFormHeaderProps {
  values: JobFormValues;
  onFieldChange: <K extends keyof JobFormValues>(field: K, value: JobFormValues[K]) => void;
}

export default function JobFormHeader({ values, onFieldChange }: JobFormHeaderProps) {
  const logo = useCompanyLogo(values.company);

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box
          component="img"
          src={logo}
          alt=""
          className="job-form-logo"
        />
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Box display="flex" flexDirection="row" justifyContent="space-between" mb={1}>
            <Box flexGrow={1} mr={1}>
              <TextInput
                required
                id="job-company-name"
                label="Company Name"
                name="company"
                value={values.company}
                onChange={(value) => onFieldChange('company', value)}
              />
            </Box>
            <Box flexGrow={1} mr={1}>
              <TextInput
                required
                id="job-title"
                label="Job Title"
                name="title"
                value={values.title}
                onChange={(value) => onFieldChange('title', value)}
              />
            </Box>
            <Box width="33.33%">
              <SelectField
                id="outlined-status-native-simple"
                label="Status"
                value={values.status}
                onChange={(value) => onFieldChange('status', Number(value))}
                options={JOB_STATUS_OPTIONS}
              />
            </Box>
          </Box>
          <JobFormDetails values={values} onFieldChange={onFieldChange} compact />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row">
        <TextInput
          id="job-details"
          multiline
          label="Details"
          className="modal-middle-details"
          name="details"
          value={values.details}
          onChange={(value) => onFieldChange('details', value)}
        />
      </Box>
    </>
  );
}

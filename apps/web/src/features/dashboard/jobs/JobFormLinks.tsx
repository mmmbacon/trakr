import { Box } from '@mui/material';

import LinkInput from '../../../components/LinkInput';
import JobFormSectionHeading from './JobFormSectionHeading';
import type { JobFormValues } from './useJobForm';

interface JobFormLinksProps {
  values: JobFormValues;
  onFieldChange: <K extends keyof JobFormValues>(field: K, value: JobFormValues[K]) => void;
}

export default function JobFormLinks({ values, onFieldChange }: JobFormLinksProps) {
  return (
    <Box display="flex" flexDirection="column" pt={2}>
      <JobFormSectionHeading title="Links" />
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box flexGrow={1} mr={1}>
          <LinkInput
            id="resume-input"
            label="Resume"
            className="links-inputfield"
            name="resume"
            value={values.resume_url}
            onChange={(value) => onFieldChange('resume_url', value)}
            action="open"
            ariaLabel="resume url"
          />
        </Box>
        <Box flexGrow={1} mr={1}>
          <LinkInput
            id="coverletter-input"
            label="Cover Letter"
            className="links-inputfield"
            name="Cover Letter"
            value={values.coverletter_url}
            onChange={(value) => onFieldChange('coverletter_url', value)}
            action="open"
            ariaLabel="cover letter url"
          />
        </Box>
        <Box flexGrow={1}>
          <LinkInput
            id="extra-link-input"
            label="Additional Link"
            className="links-inputfield"
            name="extra links"
            value={values.extra_url}
            onChange={(value) => onFieldChange('extra_url', value)}
            action="open"
            ariaLabel="additional link url"
          />
        </Box>
      </Box>
      <div className="links" />
    </Box>
  );
}

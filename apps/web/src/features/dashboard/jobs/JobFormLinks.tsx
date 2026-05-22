import { Stack } from '@mui/material';

import LinkInput from '../../../components/LinkInput';
import JobFormSectionHeading from './JobFormSectionHeading';
import type { JobFormValues } from './useJobForm';

interface JobFormLinksProps {
  values: JobFormValues;
  onFieldChange: <K extends keyof JobFormValues>(field: K, value: JobFormValues[K]) => void;
}

export default function JobFormLinks({ values, onFieldChange }: JobFormLinksProps) {
  return (
    <Stack spacing={2} pt={2}>
      <JobFormSectionHeading title="Links" />
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <LinkInput
          id="resume-input"
          label="Resume"
          name="resume"
          value={values.resume_url}
          onChange={(value) => onFieldChange('resume_url', value)}
          action="open"
          ariaLabel="resume url"
        />
        <LinkInput
          id="coverletter-input"
          label="Cover Letter"
          name="Cover Letter"
          value={values.coverletter_url}
          onChange={(value) => onFieldChange('coverletter_url', value)}
          action="open"
          ariaLabel="cover letter url"
        />
        <LinkInput
          id="extra-link-input"
          label="Additional Link"
          name="extra links"
          value={values.extra_url}
          onChange={(value) => onFieldChange('extra_url', value)}
          action="open"
          ariaLabel="additional link url"
        />
      </Stack>
    </Stack>
  );
}

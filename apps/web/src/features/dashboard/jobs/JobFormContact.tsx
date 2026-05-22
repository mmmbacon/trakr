import { Stack, TextField } from '@mui/material';

import LinkInput from '../../../components/LinkInput';
import JobFormSectionHeading from './JobFormSectionHeading';
import type { JobFormValues } from './useJobForm';

interface JobFormContactProps {
  values: JobFormValues;
  onFieldChange: <K extends keyof JobFormValues>(field: K, value: JobFormValues[K]) => void;
}

export default function JobFormContact({ values, onFieldChange }: JobFormContactProps) {
  return (
    <Stack spacing={2} pt={2}>
      <JobFormSectionHeading title="Contact" />
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <TextField
          id="contact-name"
          label="Contact Name"
          name="contact_name"
          value={values.contact_name}
          onChange={(event) => onFieldChange('contact_name', event.target.value)}
          fullWidth
        />
        <LinkInput
          id="contact-email-input"
          label="Contact Email"
          name="contact_email"
          value={values.contact_email}
          onChange={(value) => onFieldChange('contact_email', value)}
          action="mailto"
          mailtoSubject={`${values.title} - ${values.company}`}
          mailtoBody={`Hello ${values.contact_name},`}
          ariaLabel="click contact email"
        />
        <LinkInput
          id="contact-phone-input"
          label="Contact Phone Number"
          name="contact_phone"
          value={values.contact_phone}
          onChange={(value) => onFieldChange('contact_phone', value)}
          action="tel"
          ariaLabel="click contact phone"
        />
        <LinkInput
          id="contact-social-input"
          label="Contact Links"
          name="contact_socialmedia"
          value={values.contact_socialmedia}
          onChange={(value) => onFieldChange('contact_socialmedia', value)}
          action="open"
          ariaLabel="click contact social media"
        />
      </Stack>
    </Stack>
  );
}

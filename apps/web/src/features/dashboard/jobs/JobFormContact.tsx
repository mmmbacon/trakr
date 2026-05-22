import { Box, TextField } from '@mui/material';

import LinkInput from '../../../components/LinkInput';
import JobFormSectionHeading from './JobFormSectionHeading';
import type { JobFormValues } from './useJobForm';

interface JobFormContactProps {
  values: JobFormValues;
  onFieldChange: <K extends keyof JobFormValues>(field: K, value: JobFormValues[K]) => void;
}

export default function JobFormContact({ values, onFieldChange }: JobFormContactProps) {
  return (
    <Box display="flex" flexDirection="column" pt={2}>
      <JobFormSectionHeading title="Contact" />
      <Box display="flex" flexDirection="row">
        <Box flexGrow={1} mr={1}>
          <TextField
            id="contact-name"
            label="Contact Name"
            className="contact-name"
            name="contact_name"
            value={values.contact_name}
            onChange={(event) => onFieldChange('contact_name', event.target.value)}
            fullWidth
          />
        </Box>
        <Box flexGrow={1} mr={1}>
          <LinkInput
            id="contact-email-input"
            label="Contact Email"
            className="contact-email"
            name="contact_email"
            value={values.contact_email}
            onChange={(value) => onFieldChange('contact_email', value)}
            action="mailto"
            mailtoSubject={`${values.title} - ${values.company}`}
            mailtoBody={`Hello ${values.contact_name},`}
            ariaLabel="click contact email"
          />
        </Box>
        <Box flexGrow={1} mr={1}>
          <LinkInput
            id="contact-phone-input"
            label="Contact Phone Number"
            className="contact-phone"
            name="contact_phone"
            value={values.contact_phone}
            onChange={(value) => onFieldChange('contact_phone', value)}
            action="tel"
            ariaLabel="click contact phone"
          />
        </Box>
        <Box flexGrow={1}>
          <LinkInput
            id="contact-social-input"
            label="Contact Links"
            className="contact-phone"
            name="contact_socialmedia"
            value={values.contact_socialmedia}
            onChange={(value) => onFieldChange('contact_socialmedia', value)}
            action="open"
            ariaLabel="click contact social media"
          />
        </Box>
      </Box>
    </Box>
  );
}

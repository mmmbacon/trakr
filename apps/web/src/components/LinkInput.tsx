import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineSharpIcon from '@mui/icons-material/MailOutlineSharp';
import OpenInNewSharpIcon from '@mui/icons-material/OpenInNewSharp';
import PhoneIcon from '@mui/icons-material/Phone';

import { isWebUrl, openUrl } from '../utils/url';

export type LinkInputAction = 'open' | 'mailto' | 'tel' | 'maps' | 'auto-location';

interface LinkInputProps {
  id: string;
  label: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  action?: LinkInputAction;
  className?: string;
  mailtoSubject?: string;
  mailtoBody?: string;
  ariaLabel?: string;
}

function LinkInputAdornment({
  value,
  action = 'open',
  mailtoSubject,
  mailtoBody,
  ariaLabel,
}: Pick<LinkInputProps, 'value' | 'action' | 'mailtoSubject' | 'mailtoBody' | 'ariaLabel'>) {
  if (!value) {
    return null;
  }

  if (action === 'mailto') {
    const href = `mailto:${value}?subject=${mailtoSubject ?? ''}&body=${mailtoBody ?? ''}`;
    return (
      <IconButton
        aria-label={ariaLabel ?? 'click contact email'}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MailOutlineSharpIcon />
      </IconButton>
    );
  }

  if (action === 'tel') {
    return (
      <IconButton aria-label={ariaLabel ?? 'click contact phone'} href={`tel:${value}`}>
        <PhoneIcon />
      </IconButton>
    );
  }

  if (action === 'maps') {
    return (
      <IconButton
        aria-label={ariaLabel ?? 'open location in maps'}
        href={`https://www.google.com/maps/place/${value}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LocationOnIcon />
      </IconButton>
    );
  }

  if (action === 'auto-location') {
    if (isWebUrl(value)) {
      return (
        <IconButton
          aria-label={ariaLabel ?? 'click event location'}
          onClick={() => openUrl(value)}
        >
          <OpenInNewSharpIcon />
        </IconButton>
      );
    }

    return (
      <IconButton
        aria-label={ariaLabel ?? 'click event location'}
        href={`https://www.google.com/maps/place/${value}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LocationOnIcon />
      </IconButton>
    );
  }

  return (
    <IconButton
      aria-label={ariaLabel ?? 'open link'}
      onClick={() => openUrl(value)}
    >
      <OpenInNewSharpIcon />
    </IconButton>
  );
}

export default function LinkInput({
  id,
  label,
  name,
  value,
  onChange,
  action = 'open',
  className,
  mailtoSubject,
  mailtoBody,
  ariaLabel,
}: LinkInputProps) {
  return (
    <FormControl className={className} fullWidth variant="outlined">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        label={label}
        name={name ?? label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        endAdornment={(
          <InputAdornment position="end">
            <LinkInputAdornment
              value={value}
              action={action}
              mailtoSubject={mailtoSubject}
              mailtoBody={mailtoBody}
              ariaLabel={ariaLabel}
            />
          </InputAdornment>
        )}
      />
    </FormControl>
  );
}

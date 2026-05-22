import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import { isWebUrl, openUrl } from '../../utils/url';
import Icon from './Icon';
import IconButton from './IconButton';

export type LinkInputAction = 'open' | 'mailto' | 'tel' | 'maps' | 'auto-location';

interface LinkInputFieldProps {
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
}: Pick<LinkInputFieldProps, 'value' | 'action' | 'mailtoSubject' | 'mailtoBody' | 'ariaLabel'>) {
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
        <Icon name="mail" />
      </IconButton>
    );
  }

  if (action === 'tel') {
    return (
      <IconButton aria-label={ariaLabel ?? 'click contact phone'} href={`tel:${value}`}>
        <Icon name="phone" />
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
        <Icon name="location" />
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
          <Icon name="open-in-new" />
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
        <Icon name="location" />
      </IconButton>
    );
  }

  return (
    <IconButton
      aria-label={ariaLabel ?? 'open link'}
      onClick={() => openUrl(value)}
    >
      <Icon name="open-in-new" />
    </IconButton>
  );
}

export default function LinkInputField({
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
}: LinkInputFieldProps) {
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

export type { LinkInputFieldProps };

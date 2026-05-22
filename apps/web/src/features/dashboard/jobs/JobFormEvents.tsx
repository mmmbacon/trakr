import {
  Button,
  Grow,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import InsertInvitationSharpIcon from '@mui/icons-material/InsertInvitationSharp';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { google } from 'calendar-link';

import LinkInput from '../../../components/LinkInput';
import JobFormSectionHeading from './JobFormSectionHeading';
import type { JobFormValues } from './useJobForm';

interface JobFormEventsProps {
  values: JobFormValues;
  onFieldChange: <K extends keyof JobFormValues>(field: K, value: JobFormValues[K]) => void;
}

export default function JobFormEvents({ values, onFieldChange }: JobFormEventsProps) {
  const calendarEvent = {
    title: values.events,
    description: values.eventDetails,
    start: values.selectedDate ?? undefined,
    location: values.location,
    duration: [1, 'hour'] as [number, 'hour'],
  };

  const handleCalendarClick = () => {
    window.open(google(calendarEvent));
  };

  const expiredBadge = values.eventExpired && values.selectedDate ? (
    <Stack direction="row" alignItems="center" spacing={0.5} ml={1}>
      <NewReleasesIcon color="error" fontSize="small" />
      <Typography variant="caption" color="error">
        The date for this event has passed
      </Typography>
    </Stack>
  ) : null;

  return (
    <Stack spacing={2} pt={2}>
      <Stack direction="row" alignItems="center">
        <JobFormSectionHeading title="Events" />
        {expiredBadge}
      </Stack>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <TextField
          fullWidth
          id="event-title"
          label="Upcoming Event"
          value={values.events}
          onChange={(event) => onFieldChange('events', event.target.value)}
        />
        <LinkInput
          id="event-location-input"
          label="Event Location"
          name="event location"
          value={values.eventLocation}
          onChange={(value) => onFieldChange('eventLocation', value)}
          action="auto-location"
          ariaLabel="click event location"
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Calendar"
            value={values.selectedDate}
            onChange={(date) => onFieldChange('selectedDate', date)}
            slotProps={{
              textField: {
                fullWidth: true,
                id: 'date-picker-inline',
              },
            }}
          />
        </LocalizationProvider>
      </Stack>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-start">
        <TextField
          fullWidth
          id="event-details"
          multiline
          maxRows={2}
          label="Event Details"
          name="event-details"
          value={values.eventDetails}
          onChange={(event) => onFieldChange('eventDetails', event.target.value)}
          sx={{ flex: 2 }}
        />
        {values.events ? (
          <Grow in={Boolean(values.events)} timeout={500}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCalendarClick}
              disabled={!values.events}
              startIcon={<InsertInvitationSharpIcon />}
              sx={{ flex: 1, alignSelf: 'stretch' }}
            >
              Add to Google Calendar
            </Button>
          </Grow>
        ) : null}
      </Stack>
    </Stack>
  );
}

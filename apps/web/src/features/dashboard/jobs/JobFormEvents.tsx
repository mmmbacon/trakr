import {
  Box,
  Button,
  Grow,
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
    <Box
      component="span"
      display="inline-flex"
      alignItems="center"
      ml={1.25}
      mb={0.5}
    >
      <NewReleasesIcon
        sx={{
          color: '#f94144',
          zIndex: 10,
          fontSize: '1em',
        }}
      />
      <Typography
        variant="caption"
        component="span"
        sx={{ mt: 0.375, ml: 0.375, color: '#f94144' }}
      >
        The date for this event has passed
      </Typography>
    </Box>
  ) : null;

  return (
    <Box display="flex" flexDirection="column" pt={2}>
      <Box display="flex" flexDirection="row" alignItems="center">
        <JobFormSectionHeading title="Events" />
        {expiredBadge}
      </Box>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box flexGrow={1} mr={1} width="33.33%">
            <TextField
              fullWidth
              id="event-title"
              label="Upcoming Event"
              value={values.events}
              onChange={(event) => onFieldChange('events', event.target.value)}
            />
          </Box>
          <Box flexGrow={1} mr={1} width="33.33%">
            <LinkInput
              id="event-location-input"
              label="Event Location"
              name="event location"
              value={values.eventLocation}
              onChange={(value) => onFieldChange('eventLocation', value)}
              action="auto-location"
              ariaLabel="click event location"
            />
          </Box>
          <Box flexGrow={1} width="33.33%">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Calendar"
                value={values.selectedDate}
                onChange={(date) => onFieldChange('selectedDate', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                    id: 'date-picker-inline',
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <Box width="66.66%" pb={1.1}>
            <TextField
              fullWidth
              id="event-details"
              multiline
              maxRows={2}
              label="Event Details"
              className="event-details"
              name="event-details"
              value={values.eventDetails}
              onChange={(event) => onFieldChange('eventDetails', event.target.value)}
            />
          </Box>
          <Box py={1} width="33.33%" display="flex" justifyContent="flex-end">
            {values.events ? (
              <Grow in={Boolean(values.events)} timeout={500}>
                <Button
                  fullWidth
                  className="add-to-calendar"
                  variant="contained"
                  onClick={handleCalendarClick}
                  color="secondary"
                  sx={{
                    ml: 1.25,
                    color: !values.events ? 'rgba(0,0,0,0.2)' : 'white',
                  }}
                  disabled={!values.events}
                >
                  <InsertInvitationSharpIcon />
                  Add to Google Calendar
                </Button>
              </Grow>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

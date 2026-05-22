import { google } from 'calendar-link';

import LinkInput from '../../../components/LinkInput';
import {
  Box,
  Button,
  DateField,
  GrowTransition,
  Icon,
  TextInput,
  Typography,
} from '../../../components/ui';
import { openUrl } from '../../../utils/url';
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
    openUrl(google(calendarEvent));
  };

  const expiredBadge = values.eventExpired && values.selectedDate ? (
    <Box className="expired-event-badge" component="span">
      <Icon name="new-releases" size="1em" color="#f94144" />
      <Typography variant="caption" component="span" className="expired-event-text">
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
            <TextInput
              id="event-title"
              label="Upcoming Event"
              value={values.events}
              onChange={(value) => onFieldChange('events', value)}
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
            <DateField
              label="Calendar"
              value={values.selectedDate}
              onChange={(date) => onFieldChange('selectedDate', date)}
            />
          </Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <Box width="66.66%" pb={1.1}>
            <TextInput
              id="event-details"
              multiline
              maxRows={2}
              label="Event Details"
              className="event-details"
              name="event-details"
              value={values.eventDetails}
              onChange={(value) => onFieldChange('eventDetails', value)}
            />
          </Box>
          <Box py={1} width="33.33%" display="flex" justifyContent="flex-end">
            {values.events ? (
              <GrowTransition in={Boolean(values.events)}>
                <Button
                  fullWidth
                  className="add-to-calendar"
                  onClick={handleCalendarClick}
                  color="secondary"
                  disabled={!values.events}
                  startIcon={<Icon name="calendar" />}
                >
                  Add to Google Calendar
                </Button>
              </GrowTransition>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

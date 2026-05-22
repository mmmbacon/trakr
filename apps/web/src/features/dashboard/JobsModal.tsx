import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  Grow,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import InsertInvitationSharpIcon from '@mui/icons-material/InsertInvitationSharp';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import OpenInNewSharpIcon from '@mui/icons-material/OpenInNewSharp';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import MailOutlineSharpIcon from '@mui/icons-material/MailOutlineSharp';
import CancelIcon from '@mui/icons-material/Cancel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { google } from 'calendar-link';

import ModalConfirm from '../../components/ModalConfirm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authSelector } from '../auth/authSlice';
import { addJob, editJob, deleteJob } from './jobs/jobsSlice';
import type { JobEvent, JobPayload } from '../../types';

const DEFAULT_LOGO = '../../img/Logo2.png';

interface ClearbitSuggestion {
  logo?: string;
}

export interface JobsModalProps {
  open?: boolean;
  onClose: () => void;
  companyName?: string;
  jobTitle?: string;
  jobDetails?: string;
  jobLocation?: string;
  id?: number;
  jobSalary?: number;
  jobStatus?: number;
  jobUrl?: string;
  jobContact_name?: string;
  jobContact_email?: string;
  jobContact_phone?: string;
  jobContact_socialmedia?: string;
  jobResume_url?: string;
  jobCoverletter_url?: string;
  jobExtra_url?: string;
  isEditModal?: boolean;
  event_title?: string;
  event_expired?: boolean;
  event_details?: string;
  event_date?: string;
  event_location?: string;
}

function parseEventDate(date: string | undefined): Date | null {
  if (!date) {
    return null;
  }
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export const JobsModal = ({
  onClose,
  open = false,
  id,
  companyName = '',
  jobTitle = '',
  jobDetails = '',
  jobLocation = '',
  jobSalary = 0,
  jobStatus,
  jobUrl = '',
  jobContact_name = '',
  jobContact_email = '',
  jobContact_phone = '',
  jobContact_socialmedia = '',
  isEditModal = false,
  event_title = '',
  event_expired = false,
  event_details = '',
  event_date = '',
  event_location = '',
  jobResume_url = '',
  jobCoverletter_url = '',
  jobExtra_url = '',
}: JobsModalProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(authSelector);

  const [company, setCompany] = useState(companyName);
  const [title, setTitle] = useState(jobTitle);
  const [status, setStatus] = useState(jobStatus ?? 0);
  const [salary, setSalary] = useState(jobSalary);
  const [url, setUrl] = useState(jobUrl);
  const [location, setLocation] = useState(jobLocation);
  const [details, setDetails] = useState(jobDetails);
  const [contact_name, setContact_name] = useState(jobContact_name);
  const [contact_email, setContact_email] = useState(jobContact_email);
  const [contact_phone, setContact_phone] = useState(jobContact_phone);
  const [contact_socialmedia, setContact_socialmedia] = useState(jobContact_socialmedia);
  const [events, setEvents] = useState(event_title);
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => parseEventDate(event_date));
  const [eventDetails, setEventDetails] = useState(event_details);
  const [eventExpired, setEventExpired] = useState(event_expired);
  const [eventLocation, setEventLocation] = useState(event_location);
  const [resume_url, setResume_url] = useState(jobResume_url);
  const [coverletter_url, setCoverletter_url] = useState(jobCoverletter_url);
  const [extra_url, setExtra_url] = useState(jobExtra_url);
  const [error, setError] = useState('');
  const [logo, setLogo] = useState(DEFAULT_LOGO);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  function reset() {
    setCompany('');
    setTitle('');
    setSalary(0);
    setStatus(0);
    setUrl('');
    setLocation('');
    setDetails('');
    setContact_name('');
    setContact_email('');
    setContact_phone('');
    setContact_socialmedia('');
    setEvents('');
    setEventExpired(false);
    setEventDetails('');
    setEventLocation('');
    setSelectedDate(null);
    setResume_url('');
    setCoverletter_url('');
    setExtra_url('');
    setLogo(DEFAULT_LOGO);
    setError('');
  }

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    if (company === '' || title === '') {
      setError('Must include both Company Name and Job Title');
      return;
    }

    if (!user) {
      setError('You must be logged in to save');
      return;
    }

    if (!Number.isFinite(salary)) {
      setError('Salary must be a number');
      return;
    }

    const job: JobPayload['job'] & { user_id: number } = {
      user_id: user.id,
      company,
      title,
      status,
      salary,
      url,
      location,
      details,
      contact_name,
      contact_email,
      contact_phone,
      contact_socialmedia,
      resume_url,
      coverletter_url,
      extra_url,
    };

    const event: Partial<JobEvent> & { job_id?: number } = {
      job_id: id,
      title: events,
      expired: eventExpired,
      date: selectedDate ? selectedDate.toISOString() : undefined,
      details: eventDetails,
      location: eventLocation,
    };

    if (
      ((!event.title && event.date) || (event.title && !event.date))
      || ((!event.title && !event.date) && (event.details || event.location))
    ) {
      setError('Must include both Event Title and Event Date');
      return;
    }

    let actionResult;
    let selectedAction;

    if (id) {
      selectedAction = editJob;
      if (!event.title && !event.date && !event.details && !event.location) {
        actionResult = await dispatch(selectedAction({ jobId: id, job }));
      } else {
        actionResult = await dispatch(selectedAction({
          jobId: id,
          job,
          event,
        }));
      }
    } else if (!event.title && !event.date && !event.details && !event.location) {
      selectedAction = addJob;
      actionResult = await dispatch(selectedAction({ job }));
    } else {
      selectedAction = addJob;
      actionResult = await dispatch(selectedAction({ job, event }));
    }

    if (selectedAction.rejected.match(actionResult)) {
      setError('Action failed, please try again');
    } else if (selectedAction.fulfilled.match(actionResult)) {
      onClose();
      if (!isEditModal) {
        reset();
      }
    }
  };

  const handleDelete = async () => {
    if (!id) {
      return;
    }

    const actionResult = await dispatch(deleteJob({ jobId: id }));

    if (deleteJob.rejected.match(actionResult)) {
      setError('Delete failed, please try again');
      return;
    }

    onClose();
  };

  useEffect(() => {
    if (!selectedDate) {
      setEventExpired(false);
      return;
    }

    const expirydate = new Date(selectedDate);
    const currentdate = Date.now();

    setEventExpired(false);

    if (expirydate.getTime() < currentdate) {
      setEventExpired(true);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (company.length === 0) {
      return undefined;
    }

    let cancelled = false;

    async function fetchCompanyLogo() {
      try {
        const result = await axios.get<ClearbitSuggestion[]>(
          'https://autocomplete.clearbit.com/v1/companies/suggest',
          { params: { query: company } },
        );
        if (!cancelled && result.data[0]?.logo) {
          setLogo(result.data[0].logo);
        }
      } catch {
        if (!cancelled) {
          setLogo(DEFAULT_LOGO);
        }
      }
    }

    fetchCompanyLogo();

    return () => {
      cancelled = true;
    };
  }, [company]);

  const calendarEvent = {
    title: events,
    description: eventDetails,
    start: selectedDate ?? undefined,
    location,
    duration: [1, 'hour'] as [number, 'hour'],
  };

  const calendarButton = () => {
    window.open(google(calendarEvent));
  };

  const clickLink = (link: string) => {
    const url = link.substring(0, 4) !== 'http' ? `http://${link}` : link;
    window.open(url);
  };

  const locationRender = () => {
    if (
      eventLocation.substring(0, 4) === 'http'
      || eventLocation.includes('.com')
      || eventLocation.includes('.ca')
      || eventLocation.includes('www.')
    ) {
      return (
        <IconButton
          aria-label="click event location"
          onClick={() => clickLink(eventLocation)}
        >
          <OpenInNewSharpIcon />
        </IconButton>
      );
    }
    if (eventLocation !== '') {
      return (
        <IconButton
          aria-label="click event location"
          href={`https://www.google.com/maps/place/${eventLocation}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LocationOnIcon />
        </IconButton>
      );
    }
    return null;
  };

  const handleStatusChange = (event: SelectChangeEvent<number>) => {
    setStatus(Number(event.target.value));
  };

  return (
    <div>
      <Grid container>
        <Dialog
          className="job-modal-background"
          onClose={onClose}
          onClick={(event) => {
            event.stopPropagation();
          }}
          aria-labelledby="customized-dialog-title"
          open={open}
          fullWidth
          maxWidth="md"
        >
          <form onSubmit={(event) => event.preventDefault()}>
            <DialogContent dividers sx={{ p: 2.5 }}>
              {error && (
                <Alert severity="error" sx={{ width: '100%', mb: 1.25 }}>
                  {error}
                </Alert>
              )}
              <Box display="flex" flexDirection="row">
                <Box
                  component="img"
                  src={logo}
                  alt=""
                  sx={{
                    width: 100,
                    height: 100,
                    mr: 1.875,
                  }}
                />
                <Box display="flex" flexDirection="column" flexGrow={1}>
                  <Box display="flex" flexDirection="row" justifyContent="space-between" mb={1}>
                    <Box flexGrow={1} mr={1}>
                      <TextField
                        fullWidth
                        required
                        id="standard-basic"
                        label="Company Name"
                        name="company"
                        value={company}
                        onChange={(event) => setCompany(event.target.value)}
                      />
                    </Box>
                    <Box flexGrow={1} mr={1}>
                      <TextField
                        fullWidth
                        required
                        id="standard-basic"
                        label="Job Title"
                        name="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </Box>
                    <Box width="33.33%">
                      <FormControl fullWidth>
                        <InputLabel htmlFor="outlined-status-native-simple">
                          Status
                        </InputLabel>
                        <Select
                          native
                          value={status}
                          onChange={handleStatusChange}
                          label="Status"
                          inputProps={{
                            name: 'status',
                            id: 'outlined-status-native-simple',
                          }}
                        >
                          <option value={0}>Interested</option>
                          <option value={1}>Applied</option>
                          <option value={2}>Interviewing</option>
                          <option value={3}>Offers</option>
                          <option value={4}>Rejected</option>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>

                  <Box display="flex" flexDirection="row" justifyContent="space-between" mb={1}>
                    <Box flexGrow={1} mr={1}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="location-input">Location</InputLabel>
                        <OutlinedInput
                          id="location-input"
                          label="Location"
                          name="location"
                          value={location}
                          onChange={(event) => setLocation(event.target.value)}
                          endAdornment={(
                            <InputAdornment position="end">
                              {location ? (
                                <IconButton
                                  aria-label="click event location"
                                  href={`https://www.google.com/maps/place/${location}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <LocationOnIcon />
                                </IconButton>
                              ) : null}
                            </InputAdornment>
                          )}
                        />
                      </FormControl>
                    </Box>
                    <Box flexGrow={1} mr={1}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="url-input">Job Link Url</InputLabel>
                        <OutlinedInput
                          id="url-input"
                          label="Job Link Url"
                          name="url"
                          value={url}
                          onChange={(event) => setUrl(event.target.value)}
                          endAdornment={(
                            <InputAdornment position="end">
                              {url ? (
                                <IconButton
                                  aria-label="click url"
                                  onClick={() => clickLink(url)}
                                >
                                  <OpenInNewSharpIcon />
                                </IconButton>
                              ) : null}
                            </InputAdornment>
                          )}
                        />
                      </FormControl>
                    </Box>
                    <Box width="33.33%">
                      <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="salary-input">Salary</InputLabel>
                        <OutlinedInput
                          id="salary-input"
                          type="number"
                          inputProps={{ inputMode: 'numeric', min: 0 }}
                          value={salary > 0 ? salary : ''}
                          label="Salary"
                          name="salary"
                          onChange={(event) => {
                            const val = event.target.value;
                            setSalary(val === '' ? 0 : Number.parseInt(val, 10));
                          }}
                          startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box display="flex" flexDirection="row">
                <TextField
                  fullWidth
                  id="standard-multiline-flexible"
                  multiline
                  label="Details"
                  className="modal-middle-details"
                  name="details"
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                />
              </Box>

              <Box display="flex" flexDirection="row" pt={2}>
                <Typography
                  variant="h5"
                  className="heading"
                  sx={{
                    fontFamily: 'Montserrat',
                    pt: 1.875,
                    pb: 0,
                    lineHeight: '1em',
                    mt: 0,
                    mb: 0.625,
                  }}
                >
                  Events
                </Typography>
                {eventExpired && selectedDate ? (
                  <Box display="flex" alignContent="center" alignItems="center" mb={0.5}>
                    <NewReleasesIcon
                      sx={{
                        color: '#f94144',
                        zIndex: 10,
                        fontSize: '1em',
                        ml: 1.25,
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ mt: 0.375, ml: 0.375, color: '#f94144' }}
                    >
                      The date for this event has passed
                    </Typography>
                  </Box>
                ) : null}
              </Box>
              <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                  <Box flexGrow={1} mr={1} width="33.33%">
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Upcoming Event"
                      value={events}
                      onChange={(event) => setEvents(event.target.value)}
                    />
                  </Box>
                  <Box flexGrow={1} mr={1} width="33.33%">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="event-location-input">Event Location</InputLabel>
                      <OutlinedInput
                        id="event-location-input"
                        label="Event Location"
                        name="event location"
                        value={eventLocation}
                        onChange={(event) => setEventLocation(event.target.value)}
                        endAdornment={(
                          <InputAdornment position="end">
                            {locationRender()}
                          </InputAdornment>
                        )}
                      />
                    </FormControl>
                  </Box>
                  <Box flexGrow={1} width="33.33%">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Calendar"
                        value={selectedDate}
                        onChange={handleDateChange}
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
                      id="standard-multiline-flexible"
                      multiline
                      maxRows={2}
                      label="Event Details"
                      className="event-details"
                      name="details"
                      value={eventDetails}
                      onChange={(event) => setEventDetails(event.target.value)}
                    />
                  </Box>
                  <Box py={1} width="33.33%" display="flex" justifyContent="flex-end">
                    {events ? (
                      <Grow in={Boolean(events)} timeout={500}>
                        <Button
                          fullWidth
                          className="add-to-calendar"
                          variant="contained"
                          onClick={calendarButton}
                          color="secondary"
                          sx={{
                            ml: 1.25,
                            color: !events ? 'rgba(0,0,0,0.2)' : 'white',
                          }}
                          disabled={!events}
                        >
                          <InsertInvitationSharpIcon />
                          Add to Google Calendar
                        </Button>
                      </Grow>
                    ) : null}
                  </Box>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" pt={2}>
                <Typography
                  variant="h5"
                  className="heading"
                  sx={{
                    fontFamily: 'Montserrat',
                    pt: 1.875,
                    pb: 0,
                    lineHeight: '1em',
                    mt: 0,
                    mb: 0.625,
                  }}
                >
                  Contact
                </Typography>
                <Box display="flex" flexDirection="row">
                  <Box flexGrow={1} mr={1}>
                    <TextField
                      id="standard-basic"
                      label="Contact Name"
                      className="contact-name"
                      name="contact_name"
                      value={contact_name}
                      onChange={(event) => setContact_name(event.target.value)}
                      fullWidth
                    />
                  </Box>
                  <Box flexGrow={1} mr={1}>
                    <FormControl className="contact-email" fullWidth variant="outlined">
                      <InputLabel htmlFor="contact-email-input">Contact Email</InputLabel>
                      <OutlinedInput
                        id="contact-email-input"
                        label="Contact Email"
                        name="contact_email"
                        value={contact_email}
                        onChange={(event) => setContact_email(event.target.value)}
                        endAdornment={(
                          <InputAdornment position="end">
                            {contact_email ? (
                              <IconButton
                                aria-label="click contact email"
                                href={`mailto:${contact_email}?subject=${title} - ${company}&body=Hello ${contact_name},`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <MailOutlineSharpIcon />
                              </IconButton>
                            ) : null}
                          </InputAdornment>
                        )}
                      />
                    </FormControl>
                  </Box>
                  <Box flexGrow={1} mr={1}>
                    <FormControl className="contact-phone" fullWidth variant="outlined">
                      <InputLabel htmlFor="contact-phone-input">Contact Phone Number</InputLabel>
                      <OutlinedInput
                        id="contact-phone-input"
                        label="Contact Phone Number"
                        name="contact_phone"
                        value={contact_phone}
                        onChange={(event) => setContact_phone(event.target.value)}
                        endAdornment={(
                          <InputAdornment position="end">
                            {contact_phone ? (
                              <IconButton
                                aria-label="click contact phone"
                                href={`tel:${contact_phone}`}
                              >
                                <PhoneIcon />
                              </IconButton>
                            ) : null}
                          </InputAdornment>
                        )}
                      />
                    </FormControl>
                  </Box>
                  <Box flexGrow={1}>
                    <FormControl className="contact-phone" fullWidth variant="outlined">
                      <InputLabel htmlFor="contact-social-input">Contact Links</InputLabel>
                      <OutlinedInput
                        id="contact-social-input"
                        label="Contact Links"
                        name="contact_socialmedia"
                        value={contact_socialmedia}
                        onChange={(event) => setContact_socialmedia(event.target.value)}
                        endAdornment={(
                          <InputAdornment position="end">
                            {contact_socialmedia ? (
                              <IconButton
                                aria-label="click contact social media"
                                onClick={() => clickLink(contact_socialmedia)}
                              >
                                <OpenInNewSharpIcon />
                              </IconButton>
                            ) : null}
                          </InputAdornment>
                        )}
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" pt={2}>
                <Typography
                  variant="h5"
                  className="heading"
                  sx={{
                    fontFamily: 'Montserrat',
                    pt: 1.875,
                    pb: 0,
                    lineHeight: '1em',
                    mt: 0,
                    mb: 0.625,
                  }}
                >
                  Links
                </Typography>
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                  <Box flexGrow={1} mr={1}>
                    <FormControl className="links-inputfield" fullWidth variant="outlined">
                      <InputLabel htmlFor="resume-input">Resume</InputLabel>
                      <OutlinedInput
                        id="resume-input"
                        label="Resume"
                        name="resume"
                        value={resume_url}
                        onChange={(event) => setResume_url(event.target.value)}
                        endAdornment={(
                          <InputAdornment position="end">
                            {resume_url ? (
                              <IconButton
                                aria-label="resume url"
                                onClick={() => clickLink(resume_url)}
                              >
                                <OpenInNewSharpIcon />
                              </IconButton>
                            ) : null}
                          </InputAdornment>
                        )}
                      />
                    </FormControl>
                  </Box>
                  <Box flexGrow={1} mr={1}>
                    <FormControl className="links-inputfield" fullWidth variant="outlined">
                      <InputLabel htmlFor="coverletter-input">Cover Letter</InputLabel>
                      <OutlinedInput
                        id="coverletter-input"
                        label="Cover Letter"
                        name="Cover Letter"
                        value={coverletter_url}
                        onChange={(event) => setCoverletter_url(event.target.value)}
                        endAdornment={(
                          <InputAdornment position="end">
                            {coverletter_url ? (
                              <IconButton
                                aria-label="resume url"
                                onClick={() => clickLink(coverletter_url)}
                              >
                                <OpenInNewSharpIcon />
                              </IconButton>
                            ) : null}
                          </InputAdornment>
                        )}
                      />
                    </FormControl>
                  </Box>
                  <Box flexGrow={1}>
                    <FormControl className="links-inputfield" fullWidth variant="outlined">
                      <InputLabel htmlFor="extra-link-input">Additional Link</InputLabel>
                      <OutlinedInput
                        id="extra-link-input"
                        label="Additional Link"
                        name="extra links"
                        value={extra_url}
                        onChange={(event) => setExtra_url(event.target.value)}
                        endAdornment={(
                          <InputAdornment position="end">
                            {extra_url ? (
                              <IconButton
                                aria-label="resume url"
                                onClick={() => clickLink(extra_url)}
                              >
                                <OpenInNewSharpIcon />
                              </IconButton>
                            ) : null}
                          </InputAdornment>
                        )}
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Box>
              <div className="links" />
            </DialogContent>
            <Box display="flex" flexDirection="row" justifyContent="space-between" p={2}>
              <Box>
                {isEditModal ? (
                  <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={() => setConfirmModalOpen(true)}
                    sx={{ backgroundColor: '#F94144', color: 'white' }}
                  >
                    Delete
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#a9a9a9', color: 'white' }}
                    startIcon={<RotateLeftIcon />}
                    onClick={() => reset()}
                  >
                    Reset Form
                  </Button>
                )}
              </Box>
              <Box display="flex" flexGrow={1} justifyContent="flex-end">
                <Box mr={2}>
                  <Button
                    type="button"
                    onClick={onClose}
                    variant="contained"
                    color="primary"
                    startIcon={<CancelIcon />}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
              <Box>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  variant="contained"
                  color="secondary"
                  sx={{ color: 'white' }}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        </Dialog>
      </Grid>
      <ModalConfirm
        id="modal-confirm-delete"
        open={confirmModalOpen}
        onConfirm={handleDelete}
        onDecline={() => setConfirmModalOpen(false)}
      />
    </div>
  );
};

export default JobsModal;

/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles, StylesProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { useDebounce } from 'use-debounce';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
// import GoogleMaps from '../../components/Location-input';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  google,
} from 'calendar-link';
import InsertInvitationSharpIcon from '@material-ui/icons/InsertInvitationSharp';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { SideBarButton } from '../common/SideBarButton';

import './Jobs-modal.scss';

const useStyles = makeStyles(() => ({
  icon: {
    fontSize: '50px',
  },
  add: {
    color: 'black',
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const JobsModal = () => {
  const [open, setOpen] = useState(false);
  const user_id = 1;
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(0);
  const [salary, setSalary] = useState(0);
  const [url, setUrl] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [contact_name, setContact_name] = useState('');
  const [contact_email, setContact_email] = useState('');
  const [contact_phone, setContact_phone] = useState('');
  const [contact_socialmedia, setContact_socialmedia] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [events, setEvents] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [eventLocation, setEventLocation] = useState('');

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
    setEventDetails('');
    setEventLocation('');
    setSelectedDate(new Date(Date.now()));
  }

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    const jobObject = {
      user_id,
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
    };

    const eventsObject = {
      title: events,
      date: selectedDate,
      details: eventDetails,
      location: eventLocation,
    };

    const fullObject = {
      job: jobObject,
      event: eventsObject,
    };

    if (company === '') {
      return null;
    } if (title === '') {
      return null;
    }

    if (events === '') {
      return axios.post('/api/jobs', jobObject).then(() => handleClose())
        .catch((err) => err);
    }
    return axios.post('/api/jobs', fullObject).then(() => handleClose())
      .catch((err) => err);
  };

  const debouncedText = useDebounce(company.replace(/\s/g, ''), 10);

  const companyLogo = () => {
    if (company.length > 0) {
      return `//logo.clearbit.com/${debouncedText[0]}.com`;
    }
    return 'https://i.imgur.com/n7X5rsl.png';
  };

  const calendarEvent = {
    title: events,
    description: eventDetails,
    start: selectedDate,
    location,
    duration: [1, 'hour'],
  };

  const calendarButton = () => {
    window.open(google(calendarEvent));
  };

  return (
    <div>
      <StylesProvider>
        <Grid container>
          <SideBarButton onClick={handleClickOpen}>
            <AddIcon className={`${classes.icon} ${classes.add}`} />
          </SideBarButton>
          <Dialog className="job-modal-background" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="sm">
            <form className="job-modal-box" onSubmit={(event) => event.preventDefault()}>
              <DialogContent dividers>
                <div className="modal-top">
                  <img id="company-logo" src={companyLogo()} alt="" />
                  <div className="modal-top-right">
                    <TextField required id="standard-basic" label="Company Name" className="content" name="company" value={company} onChange={(event) => setCompany(event.target.value)} />
                    <FormControl id="demo-simple-select" className="status-selector" style={{ marginLeft: 15 }}>
                      <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
                      <Select
                        native
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        label="Status"
                        inputProps={{
                          name: 'status',
                          id: 'outlined-age-native-simple',
                        }}
                      >
                        <option value={0}>Interested</option>
                        <option value={1}>Applied</option>
                        <option value={2}>Interviewing</option>
                        <option value={3}>Offers</option>
                        <option value={4}>Rejected</option>
                      </Select>
                    </FormControl>
                    <TextField required id="standard-basic" label="Job Title" className="content" name="title" value={title} onChange={(event) => setTitle(event.target.value)} />
                    <TextField id="standard-basic" label="Location" className="content-location" style={{ marginLeft: 15 }} name="location" value={location} onChange={(event) => setLocation(event.target.value)} />
                  </div>
                </div>
                <div className="modal-middle">
                  <TextField id="standard-basic" label="Job Link Url" className="modal-middle-url" name="url" value={url} onChange={(event) => setUrl(event.target.value)} />
                  <TextField id="standard-basic" type="number" label="Salary" className="modal-middle-salary" name="salary" style={{ marginLeft: 11.2 }} value={salary} onChange={(event) => setSalary(parseInt(event.target.value, 10))} />
                  <TextField id="standard-multiline-flexible" multiline label="Details" className="modal-middle-details" style={{ marginTop: 5 }} name="details" value={details} onChange={(event) => setDetails(event.target.value)} />
                </div>
                <h3 className="heading">Contact</h3>
                <div className="contact-info">
                  <TextField id="standard-basic" label="Contact Name" className="contact-name" name="contact_name" value={contact_name} onChange={(event) => setContact_name(event.target.value)} />
                  <TextField id="standard-basic" label="Contact Email" className="contact-email" name="contact_email" value={contact_email} onChange={(event) => setContact_email(event.target.value)} />
                  <TextField id="standard-basic" label="Contact Phone Number" className="contact-phone" style={{ marginTop: 5 }} name="contact_phone" value={contact_phone} onChange={(event) => setContact_phone(event.target.value)} />
                  <TextField id="standard-basic" label="Contact Links (LinkedIn)" className="contact-social" style={{ marginTop: 5 }} name="contact_socialmedia" value={contact_socialmedia} onChange={(event) => setContact_socialmedia(event.target.value)} />
                </div>
                <div className="eventHeader">
                  <h3 className="heading">Events</h3>
                  <Button className="add-to-calendar" variant="contained" onClick={calendarButton} color="secondary" style={{ marginLeft: 10 }}>
                    <InsertInvitationSharpIcon />
                    <h5 style={{ marginLeft: 5 }}>Add to Google Calendar</h5>
                  </Button>
                </div>
                <div className="event">
                  <TextField id="standard-basic" className="event-upcoming" label="Upcoming Event" value={events} onChange={(event) => setEvents(event.target.value)} />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className="event-calendar"
                      style={{ margin: 0 }}
                      disableToolbar
                      variant="outlined"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Calendar"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <TextField id="standard-multiline-flexible" multiline label="Event Details" className="event-details" style={{ marginTop: 5 }} name="details" value={eventDetails} onChange={(event) => setEventDetails(event.target.value)} />
                  <TextField id="standard-basic" label="Event Location" className="event-location" style={{ marginTop: 5 }} name="event location" value={eventLocation} onChange={(event) => setEventLocation(event.target.value)} />
                </div>
              </DialogContent>
              <DialogActions>
                <div>
                  <Button type="submit" variant="outlined" color="secondary" startIcon={<DeleteIcon />}>
                    <h5 style={{ margin: 2 }}>Delete</h5>
                  </Button>
                </div>
                <Button type="submit" autoFocus onClick={handleClose} variant="contained" color="default">
                  <h5 style={{ margin: 2 }}>Cancel</h5>
                </Button>
                <Button type="submit" onClick={() => handleSubmit()} variant="contained" color="primary" startIcon={<SaveIcon />}>
                  <h5 style={{ margin: 2 }}>Save</h5>
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Grid>
      </StylesProvider>
    </div>
  );
};

export default JobsModal;

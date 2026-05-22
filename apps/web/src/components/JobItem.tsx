import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

import { useAppDispatch } from '../app/hooks';
import ModalConfirm from './ModalConfirm';
import { JobsModal } from '../features/dashboard/JobsModal';
import { deleteJob } from '../features/dashboard/jobs/jobsSlice';

export interface JobItemProps {
  id?: number;
  company?: string;
  title?: string;
  description?: string;
  location?: string;
  salary?: number;
  status?: number;
  url?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_socialmedia?: string;
  resume_url?: string;
  coverletter_url?: string;
  extra_url?: string;
  event_title?: string;
  event_expired?: boolean;
  event_details?: string;
  event_date?: string;
  event_location?: string;
  event_jobid?: number;
  event_id?: number;
}

const JobItem = ({
  id,
  company = '',
  title = '',
  description = '',
  location = '',
  salary,
  status,
  url = '',
  contact_name = '',
  contact_email = '',
  contact_phone = '',
  contact_socialmedia = '',
  event_title = '',
  event_expired = false,
  event_details = '',
  event_date = '',
  event_location = '',
  resume_url = '',
  coverletter_url = '',
  extra_url = '',
}: JobItemProps) => {
  const dispatch = useAppDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventExpired, setEventExpired] = useState(false);
  const [logo, setLogo] = useState('');

  const openModal = () => {
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (id !== undefined) {
      dispatch(deleteJob({ jobId: id }));
    }
    setModalOpen(false);
  };

  const handleDeclineDelete = () => {
    setModalOpen(false);
  };

  const handleRedirect = (): string | null => {
    if (url !== '') {
      if (url.substring(0, 4) !== 'http') {
        return `http://${url}`;
      }
      return url;
    }
    return null;
  };

  useEffect(() => {
    const expirydate = new Date(event_date);
    const currentdate = Date.now();

    setEventExpired(false);

    if (expirydate.getTime() < currentdate) {
      setEventExpired(true);
    }
  }, [event_date]);

  useEffect(() => {
    if (company.length === 0) {
      return undefined;
    }

    let cancelled = false;

    async function fetchCompanyLogo() {
      try {
        const result = await axios.get<Array<{ logo?: string }>>(
          'https://autocomplete.clearbit.com/v1/companies/suggest',
          { params: { query: company } },
        );
        if (!cancelled && result.data[0]?.logo) {
          setLogo(result.data[0].logo);
        }
      } catch {
        if (!cancelled) {
          setLogo('../img/Logo2.png');
        }
      }
    }

    fetchCompanyLogo();

    return () => {
      cancelled = true;
    };
  }, [company]);

  const redirectUrl = handleRedirect();

  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor: 'white',
        marginBottom: '5px',
        padding: '10px',
        '&:hover': {
          backgroundColor: '#f6f6f6',
        },
      }}
    >
      {eventExpired ? (
        <Box sx={{ position: 'absolute', marginTop: '-7px', marginLeft: '-7px' }}>
          <NewReleasesIcon sx={{ color: '#f94144', fontSize: '1.5em' }} />
        </Box>
      ) : null}
      <Box display="flex" flexDirection="column" width="100%">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          width="100%"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: '75px',
              minWidth: '75px',
              height: '75px',
              '@media (max-width:1550px)': {
                width: '50px',
                minWidth: '50px',
                height: '50px',
              },
              fontSize: '0px',
              paddingRight: '3px',
            }}
          >
            <a href={redirectUrl ?? undefined} target="_blank" rel="noreferrer">
              <Box
                component="img"
                src={logo}
                alt="logo"
                sx={{
                  width: '50px',
                  minWidth: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  '@media (max-width:1550px)': {
                    width: '35px',
                    minWidth: '35px',
                    height: '35px',
                  },
                }}
              />
            </a>
          </Box>
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Typography
              variant="h5"
              align="left"
              sx={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 600,
                paddingTop: 0,
                paddingBottom: '3px',
                lineHeight: '1em',
              }}
            >
              {company}
            </Typography>
            <Typography
              variant="body1"
              align="left"
              sx={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 500,
                paddingTop: 0,
                paddingBottom: 0,
                lineHeight: '1em',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              align="left"
              sx={{
                fontFamily: 'Source Sans Pro, sans-serif',
                paddingTop: '3px',
                paddingBottom: 0,
                lineHeight: '1em',
              }}
            >
              {location}
            </Typography>
          </Box>
          <Box
            display="flex"
            sx={{
              flexDirection: 'row',
              '@media (max-width:1550px)': {
                flexDirection: 'column',
              },
            }}
          >
            <IconButton
              id="icon-button"
              aria-label="edit-item"
              onClick={openModal}
              sx={{
                width: '1.5em',
                height: '1.5em',
                color: '#d9d9d9',
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => { setModalOpen(true); }}
              sx={{
                width: '1.5em',
                height: '1.5em',
                color: '#d9d9d9',
              }}
            >
              <DeleteIcon />
            </IconButton>
            <JobsModal
              open={editModalOpen}
              onClose={closeModal}
              id={id}
              companyName={company}
              jobTitle={title}
              jobDetails={description}
              jobLocation={location}
              jobSalary={salary}
              jobStatus={status}
              jobUrl={url}
              jobContact_name={contact_name}
              jobContact_email={contact_email}
              jobContact_phone={contact_phone}
              jobContact_socialmedia={contact_socialmedia}
              jobResume_url={resume_url}
              jobCoverletter_url={coverletter_url}
              jobExtra_url={extra_url}
              event_title={event_title}
              event_expired={event_expired}
              event_details={event_details}
              event_date={event_date}
              event_location={event_location}
              isEditModal
            />
          </Box>

          <ModalConfirm
            open={modalOpen}
            onConfirm={handleConfirmDelete}
            onDecline={handleDeclineDelete}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default JobItem;

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

import { useAppDispatch } from '../app/hooks';
import ModalConfirm from './ModalConfirm';
import { JobsModal } from '../features/dashboard/JobsModal';
import { deleteJob } from '../features/dashboard/jobs/jobsSlice';

const FALLBACK_LOGO = '/img/Logo2.png';

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
  const [logo, setLogo] = useState(FALLBACK_LOGO);

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
    if (!event_date) {
      setEventExpired(false);
      return;
    }

    const expirydate = new Date(event_date);
    if (Number.isNaN(expirydate.getTime())) {
      setEventExpired(false);
      return;
    }

    setEventExpired(expirydate.getTime() < Date.now());
  }, [event_date]);

  useEffect(() => {
    if (company.length === 0) {
      return undefined;
    }

    let cancelled = false;

    async function fetchCompanyLogo() {
      try {
        const result = await axios.get<Array<{ logo?: string; domain?: string }>>(
          'https://autocomplete.clearbit.com/v1/companies/suggest',
          { params: { query: company } },
        );
        if (cancelled) {
          return;
        }

        const match = result.data[0];
        if (match?.logo) {
          setLogo(match.logo);
        } else if (match?.domain) {
          setLogo(`https://logo.clearbit.com/${match.domain}`);
        } else {
          setLogo(FALLBACK_LOGO);
        }
      } catch {
        if (!cancelled) {
          setLogo(FALLBACK_LOGO);
        }
      }
    }

    setLogo(FALLBACK_LOGO);
    fetchCompanyLogo();

    return () => {
      cancelled = true;
    };
  }, [company]);

  const redirectUrl = handleRedirect();
  const expiredEventLabel = event_title
    ? `Scheduled event "${event_title}" has passed`
    : 'Scheduled event has passed';

  return (
    <Paper
      component="article"
      aria-label={`${company}, ${title}, ${location}`}
      elevation={1}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'white',
        marginBottom: '5px',
        padding: '10px',
        '&:hover': {
          backgroundColor: '#f6f6f6',
        },
      }}
    >
      {eventExpired ? (
        <Tooltip title={expiredEventLabel} arrow>
          <Box
            component="span"
            sx={{
              position: 'absolute',
              top: 4,
              left: 4,
              display: 'flex',
              lineHeight: 0,
            }}
          >
            <NewReleasesIcon sx={{ color: '#f94144', fontSize: '1.25rem' }} aria-hidden />
          </Box>
        </Tooltip>
      ) : null}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        width="100%"
        gap={0.5}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            flexShrink: 0,
            width: 44,
            minWidth: 44,
            height: 44,
          }}
        >
          <Box
            component="a"
            href={redirectUrl ?? undefined}
            target="_blank"
            rel="noreferrer"
            aria-label={redirectUrl ? `Open ${company} job posting` : undefined}
            sx={{ lineHeight: 0 }}
          >
            <Box
              component="img"
              src={logo}
              alt=""
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          minWidth={0}
          sx={{ overflow: 'hidden' }}
        >
          <Typography
            variant="subtitle1"
            align="left"
            noWrap
            sx={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            {company}
          </Typography>
          <Typography
            variant="body2"
            align="left"
            sx={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500,
              lineHeight: 1.2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            align="left"
            noWrap
            sx={{
              fontFamily: 'Source Sans Pro, sans-serif',
              lineHeight: 1.2,
              pt: 0.25,
            }}
          >
            {location}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          flexShrink={0}
          alignItems="center"
        >
          <IconButton
            aria-label={`Edit ${company} job`}
            onClick={openModal}
            size="small"
            sx={{ color: '#d9d9d9' }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label={`Delete ${company} job`}
            onClick={() => { setModalOpen(true); }}
            size="small"
            sx={{ color: '#d9d9d9' }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
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
      <ModalConfirm
        open={modalOpen}
        onConfirm={handleConfirmDelete}
        onDecline={handleDeclineDelete}
      />
    </Paper>
  );
};

export default JobItem;

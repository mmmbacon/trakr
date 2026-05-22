import { useState } from 'react';
import { Paper } from '@mui/material';

import { useAppDispatch } from '../app/hooks';
import ModalConfirm from './ModalConfirm';
import JobItemCard from './JobItemCard';
import { useJobItemState } from './useJobItemState';
import { JobsModal } from '../features/dashboard/jobs/JobsModal';
import { deleteJob } from '../features/dashboard/jobs/jobsSlice';
import type { Job } from '../types';

export interface JobItemProps {
  job: Job;
}

const JobItem = ({ job }: JobItemProps) => {
  const dispatch = useAppDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { logo, eventExpired } = useJobItemState(job);

  const handleConfirmDelete = () => {
    dispatch(deleteJob({ jobId: job.id }));
    setModalOpen(false);
  };

  return (
    <Paper
      component="article"
      aria-label={`${job.company}, ${job.title}, ${job.location}`}
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
      <JobItemCard
        job={job}
        logo={logo}
        eventExpired={eventExpired}
        onEdit={() => setEditModalOpen(true)}
        onDelete={() => setModalOpen(true)}
      />
      <JobsModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        job={job}
        mode="edit"
      />
      <ModalConfirm
        open={modalOpen}
        onConfirm={handleConfirmDelete}
        onDecline={() => setModalOpen(false)}
      />
    </Paper>
  );
};

export default JobItem;

import { useState } from 'react';
import {
  Alert,
  Dialog,
  DialogContent,
} from '@mui/material';

import ModalConfirm from '../../../components/ModalConfirm';
import type { Job } from '../../../types';
import JobFormActions from './JobFormActions';
import JobFormContact from './JobFormContact';
import JobFormEvents from './JobFormEvents';
import JobFormHeader from './JobFormHeader';
import JobFormLinks from './JobFormLinks';
import { useJobForm } from './useJobForm';

export interface JobsModalProps {
  open?: boolean;
  onClose: () => void;
  job?: Job;
  mode?: 'create' | 'edit';
}

export const JobsModal = ({
  onClose,
  open = false,
  job,
  mode = job ? 'edit' : 'create',
}: JobsModalProps) => {
  const isEditMode = mode === 'edit';
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const {
    values,
    setField,
    error,
    reset,
    handleSubmit,
    handleDelete,
  } = useJobForm({
    job,
    open,
    isEditMode,
    onClose,
  });

  const onConfirmDelete = async () => {
    setConfirmModalOpen(false);
    await handleDelete();
  };

  return (
    <>
      <Dialog
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
          <DialogContent dividers>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <JobFormHeader values={values} onFieldChange={setField} />
            <JobFormEvents values={values} onFieldChange={setField} />
            <JobFormContact values={values} onFieldChange={setField} />
            <JobFormLinks values={values} onFieldChange={setField} />
          </DialogContent>
          <JobFormActions
            isEditMode={isEditMode}
            onCancel={onClose}
            onSubmit={handleSubmit}
            onReset={reset}
            onDeleteClick={() => setConfirmModalOpen(true)}
          />
        </form>
      </Dialog>
      <ModalConfirm
        id="modal-confirm-delete"
        open={confirmModalOpen}
        onConfirm={onConfirmDelete}
        onDecline={() => setConfirmModalOpen(false)}
      />
    </>
  );
};

export default JobsModal;

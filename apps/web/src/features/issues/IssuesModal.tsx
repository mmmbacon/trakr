import { useState } from 'react';

import ModalConfirm from '../../components/ModalConfirm';
import type { Issue } from '../../types';
import { Alert, Grid, Modal, ModalContent } from '../../components/ui';
import { useAppSelector } from '../../app/hooks';
import { projectsSelector } from '../projects/projectsSlice';
import IssueFormActions from './IssueFormActions';
import IssueFormFields from './IssueFormFields';
import { useIssueForm } from './useIssueForm';

export interface IssuesModalProps {
  open?: boolean;
  onClose: () => void;
  issue?: Issue;
  mode?: 'create' | 'edit';
}

export const IssuesModal = ({
  onClose,
  open = false,
  issue,
  mode = issue ? 'edit' : 'create',
}: IssuesModalProps) => {
  const isEditMode = mode === 'edit';
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const { workflowStates } = useAppSelector(projectsSelector);
  const {
    values,
    setField,
    error,
    reset,
    handleSubmit,
    handleDelete,
  } = useIssueForm({
    issue,
    open,
    isEditMode,
    onClose,
  });

  const onConfirmDelete = async () => {
    setConfirmModalOpen(false);
    await handleDelete();
  };

  return (
    <div>
      <Grid container>
        <Modal
          className="job-modal-background"
          onClose={onClose}
          onClick={(event) => {
            event.stopPropagation();
          }}
          aria-labelledby="issue-dialog-title"
          open={open}
          fullWidth
          maxWidth="md"
        >
          <form onSubmit={(event) => event.preventDefault()}>
            <ModalContent dividers>
              {error && (
                <Alert severity="error" className="alert-full-width">
                  {error}
                </Alert>
              )}
              <IssueFormFields
                values={values}
                workflowStates={workflowStates}
                onFieldChange={setField}
              />
            </ModalContent>
            <IssueFormActions
              isEditMode={isEditMode}
              onCancel={onClose}
              onSubmit={handleSubmit}
              onReset={reset}
              onDeleteClick={() => setConfirmModalOpen(true)}
            />
          </form>
        </Modal>
      </Grid>
      <ModalConfirm
        open={confirmModalOpen}
        onConfirm={onConfirmDelete}
        onDecline={() => setConfirmModalOpen(false)}
      />
    </div>
  );
};

export default IssuesModal;

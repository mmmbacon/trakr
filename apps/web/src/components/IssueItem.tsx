import { useState } from 'react';

import { useAppDispatch } from '../app/hooks';
import ModalConfirm from './ModalConfirm';
import IssueItemCard from './IssueItemCard';
import { IssuesModal } from '../features/issues/IssuesModal';
import { deleteIssue } from '../features/issues/issuesSlice';
import { Paper } from './ui';
import type { Issue } from '../types';

export interface IssueItemProps {
  issue: Issue;
}

const IssueItem = ({ issue }: IssueItemProps) => {
  const dispatch = useAppDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleConfirmDelete = () => {
    dispatch(deleteIssue({ issueId: issue.id }));
    setModalOpen(false);
  };

  return (
    <Paper
      component="article"
      variant="outlined"
      elevation={0}
      aria-label={`${issue.identifier}, ${issue.title}`}
    >
      <IssueItemCard
        issue={issue}
        onEdit={() => setEditModalOpen(true)}
        onDelete={() => setModalOpen(true)}
      />
      <IssuesModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        issue={issue}
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

export default IssueItem;

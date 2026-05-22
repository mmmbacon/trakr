import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import ModalConfirm from '../../components/ModalConfirm';
import {
  IssuePanelBody,
  IssuePanelFooter,
  IssuePanelHeaderView,
  IssuePanelShell,
} from '../../components/ui';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { Issue, Priority } from '../../types';
import { projectsSelector } from '../projects/projectsSlice';
import {
  projectBoardPath,
  projectIssuePath,
  projectListPath,
} from '../projects/projectRoutes';
import { PRIORITY_OPTIONS } from './constants';
import {
  clearSelectedIssue,
  createActivity,
  deleteIssue,
  editIssue,
  fetchIssueByNumber,
} from './issuesSlice';

interface IssuePanelProps {
  projectKey: string;
  issueNumber: number;
  backgroundView?: 'board' | 'list';
}

export default function IssuePanel({
  projectKey,
  issueNumber,
  backgroundView = 'board',
}: IssuePanelProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { workflowStates } = useAppSelector(projectsSelector);
  const { selectedIssue, selectedIssueStatus, issues, createActivityStatus } =
    useAppSelector((state) => state.issues);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const fetchedIssueRef = useRef<string | null>(null);

  const cachedIssue = issues.find((issue) => issue.number === issueNumber) ?? null;
  const issue: Issue | null = selectedIssue?.number === issueNumber
    ? selectedIssue
    : cachedIssue;

  useEffect(() => {
    const fetchKey = `${projectKey}:${issueNumber}`;
    if (fetchedIssueRef.current === fetchKey) {
      return;
    }
    if (selectedIssue?.number === issueNumber && (selectedIssue.activities?.length ?? 0) > 0) {
      fetchedIssueRef.current = fetchKey;
      return;
    }
    const cached = issues.find((item) => item.number === issueNumber);
    if ((cached?.activities?.length ?? 0) > 0) {
      fetchedIssueRef.current = fetchKey;
      return;
    }
    fetchedIssueRef.current = fetchKey;
    dispatch(fetchIssueByNumber({ projectKey, number: issueNumber }));
  }, [dispatch, projectKey, issueNumber, selectedIssue, issues]);

  const handleClose = useCallback(() => {
    dispatch(clearSelectedIssue());
    navigate(backgroundView === 'list' ? projectListPath(projectKey) : projectBoardPath(projectKey));
  }, [backgroundView, dispatch, navigate, projectKey]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  const saveTitle = useDebouncedCallback((value: string) => {
    if (!issue) {
      return;
    }
    const trimmed = value.trim();
    if (!trimmed || trimmed === issue.title) {
      return;
    }
    void dispatch(editIssue({
      issueId: issue.id,
      payload: { issue: { title: trimmed } },
    }));
  }, 500);

  const saveDescription = useDebouncedCallback((value: string) => {
    if (!issue || value === (issue.description ?? '')) {
      return;
    }
    void dispatch(editIssue({
      issueId: issue.id,
      payload: { issue: { title: issue.title, description: value } },
    }));
  }, 600);

  const handleCopyLink = () => {
    const url = new URL(projectIssuePath(projectKey, issueNumber), window.location.origin);
    void navigator.clipboard.writeText(url.toString());
  };

  const handleCopyId = () => {
    if (!issue) {
      return;
    }
    void navigator.clipboard.writeText(issue.identifier);
  };

  const handleConfirmDelete = async () => {
    if (!issue) {
      return;
    }
    const result = await dispatch(deleteIssue({ issueId: issue.id }));
    setConfirmDeleteOpen(false);
    if (deleteIssue.fulfilled.match(result)) {
      handleClose();
    }
  };

  const handleCommentSubmit = async (body: string) => {
    if (!issue) {
      return;
    }
    await dispatch(createActivity({ issueId: issue.id, body }));
  };

  return (
    <>
      <IssuePanelShell
        loading={selectedIssueStatus === 'loading' && !issue}
        failed={selectedIssueStatus === 'failed' && !issue}
        onClose={handleClose}
        header={issue ? (
          <IssuePanelHeaderView
            identifier={issue.identifier}
            title={issue.title}
            priority={issue.priority}
            workflowStateId={issue.workflow_state.id}
            workflowStates={workflowStates}
            priorityOptions={PRIORITY_OPTIONS}
            onClose={handleClose}
            onTitleChange={saveTitle}
            onStatusChange={(workflowStateId) => {
              void dispatch(editIssue({
                issueId: issue.id,
                payload: { issue: { title: issue.title, workflow_state_id: workflowStateId } },
              }));
            }}
            onPriorityChange={(priority: Priority) => {
              void dispatch(editIssue({
                issueId: issue.id,
                payload: { issue: { title: issue.title, priority } },
              }));
            }}
          />
        ) : null}
        footer={issue ? (
          <IssuePanelFooter
            onCopyLink={handleCopyLink}
            onCopyId={handleCopyId}
            onDelete={() => setConfirmDeleteOpen(true)}
          />
        ) : null}
      >
        {issue ? (
          <IssuePanelBody
            description={issue.description ?? ''}
            activities={issue.activities ?? []}
            workflowStates={workflowStates}
            submittingComment={createActivityStatus === 'loading'}
            onDescriptionChange={saveDescription}
            onCommentSubmit={handleCommentSubmit}
          />
        ) : null}
      </IssuePanelShell>

      <ModalConfirm
        open={confirmDeleteOpen}
        onConfirm={() => void handleConfirmDelete()}
        onDecline={() => setConfirmDeleteOpen(false)}
      />
    </>
  );
}

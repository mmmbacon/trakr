import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectActiveProject, projectsSelector } from '../projects/projectsSlice';
import type { Issue, IssuePayload, Priority } from '../../types';
import { addIssue, deleteIssue, editIssue } from './issuesSlice';
import { DEFAULT_PRIORITY } from './constants';

export interface IssueFormValues {
  title: string;
  description: string;
  workflow_state_id: number | '';
  priority: Priority;
  comment: string;
}

const emptyFormValues = (): IssueFormValues => ({
  title: '',
  description: '',
  workflow_state_id: '',
  priority: DEFAULT_PRIORITY,
  comment: '',
});

function issueToFormValues(issue?: Issue): IssueFormValues {
  if (!issue) {
    return emptyFormValues();
  }

  return {
    title: issue.title,
    description: issue.description ?? '',
    workflow_state_id: issue.workflow_state.id,
    priority: issue.priority,
    comment: '',
  };
}

interface UseIssueFormOptions {
  issue?: Issue;
  open: boolean;
  isEditMode: boolean;
  onClose: () => void;
}

export function useIssueForm({
  issue,
  open,
  isEditMode,
  onClose,
}: UseIssueFormOptions) {
  const dispatch = useAppDispatch();
  const activeProject = useAppSelector(selectActiveProject);
  const { workflowStates } = useAppSelector(projectsSelector);
  const [values, setValues] = useState<IssueFormValues>(() => issueToFormValues(issue));
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setValues(issueToFormValues(issue));
      setError('');
    }
  }, [open, issue]);

  useEffect(() => {
    if (!open || issue || workflowStates.length === 0) {
      return;
    }
    setValues((prev) => {
      if (prev.workflow_state_id !== '') {
        return prev;
      }
      const backlog = workflowStates.find((s) => s.slug === 'backlog') ?? workflowStates[0];
      return { ...prev, workflow_state_id: backlog.id };
    });
  }, [open, issue, workflowStates]);

  const setField = useCallback(<K extends keyof IssueFormValues>(
    field: K,
    value: IssueFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues(emptyFormValues());
    setError('');
  }, []);

  const handleSubmit = async () => {
    if (values.title.trim() === '') {
      setError('Title is required');
      return;
    }

    if (!activeProject) {
      setError('No active project selected');
      return;
    }

    const issueData: IssuePayload['issue'] = {
      title: values.title.trim(),
      description: values.description,
      priority: values.priority,
    };

    if (values.workflow_state_id !== '') {
      issueData.workflow_state_id = values.workflow_state_id;
    }

    const payload: IssuePayload = { issue: issueData };
    if (values.comment.trim()) {
      payload.activity = { body: values.comment.trim() };
    }

    let actionResult;
    if (issue?.id) {
      actionResult = await dispatch(editIssue({ issueId: issue.id, payload }));
    } else {
      actionResult = await dispatch(addIssue({ projectKey: activeProject.key, payload }));
    }

    const action = issue?.id ? editIssue : addIssue;
    if (action.rejected.match(actionResult)) {
      setError('Action failed, please try again');
    } else if (action.fulfilled.match(actionResult)) {
      onClose();
      if (!isEditMode) {
        reset();
      }
    }
  };

  const handleDelete = async () => {
    if (!issue?.id) {
      return;
    }

    const actionResult = await dispatch(deleteIssue({ issueId: issue.id }));

    if (deleteIssue.rejected.match(actionResult)) {
      setError('Delete failed, please try again');
      return;
    }

    onClose();
  };

  return {
    values,
    setField,
    error,
    reset,
    handleSubmit,
    handleDelete,
  };
}

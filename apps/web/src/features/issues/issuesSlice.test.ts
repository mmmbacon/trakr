import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it } from 'vitest';

import issuesReducer, {
  optimisticTransitionIssue,
  transitionIssue,
} from './issuesSlice';
import type { Issue, IssuesState } from '../../types';

const workflowStateA = {
  id: 1,
  name: 'Backlog',
  slug: 'backlog',
  position: 0,
  category: 'backlog' as const,
};

const workflowStateB = {
  id: 2,
  name: 'Ready',
  slug: 'ready',
  position: 2,
  category: 'active' as const,
};

const sampleIssue: Issue = {
  id: 10,
  number: 1,
  identifier: 'TRK-1',
  title: 'Test issue',
  description: '',
  priority: 'none',
  project: { id: 1, key: 'TRK', name: 'Trakr', color: '#000' },
  workflow_state: workflowStateA,
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
};

function createStore(preloadedIssues: Issue[] = [sampleIssue]) {
  const preloadedState: IssuesState = {
    issues: preloadedIssues,
    selectedIssue: null,
    selectedIssueStatus: 'idle',
    status: 'idle',
    addIssueStatus: 'idle',
    editIssueStatus: 'idle',
    deleteIssueStatus: 'idle',
    transitionIssueStatus: 'idle',
    createActivityStatus: 'idle',
  };

  return configureStore({
    reducer: { issues: issuesReducer },
    preloadedState: { issues: preloadedState },
  });
}

describe('issuesSlice transitionIssue', () => {
  it('optimistically updates workflow state', () => {
    const store = createStore();
    store.dispatch(optimisticTransitionIssue({
      issueId: 10,
      workflowState: workflowStateB,
    }));

    expect(store.getState().issues.issues[0].workflow_state.id).toBe(2);
  });

  it('reverts workflow state on rejected transition', () => {
    const store = createStore();
    store.dispatch(optimisticTransitionIssue({
      issueId: 10,
      workflowState: workflowStateB,
    }));

    store.dispatch({
      type: transitionIssue.rejected.type,
      payload: { issueId: 10, previousWorkflowState: workflowStateA },
    });

    expect(store.getState().issues.issues[0].workflow_state.id).toBe(1);
  });
});

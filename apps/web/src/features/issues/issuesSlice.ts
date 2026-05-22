import axios from 'axios';
import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import type { Activity, Issue, IssuePayload, IssuesState, WorkflowState } from '../../types';
import type { RootState } from '../../app/store';

const initialState: IssuesState = {
  issues: [],
  selectedIssue: null,
  selectedIssueStatus: 'idle',
  status: 'idle',
  addIssueStatus: 'idle',
  editIssueStatus: 'idle',
  deleteIssueStatus: 'idle',
  transitionIssueStatus: 'idle',
  createActivityStatus: 'idle',
};

function getErrorPayload(error: unknown) {
  if (axios.isAxiosError(error) && error.response?.data) {
    return error.response.data;
  }
  return { error: 'Request failed' };
}

function upsertIssue(issues: Issue[], updated: Issue): Issue[] {
  const index = issues.findIndex((issue) => issue.id === updated.id);
  if (index === -1) {
    return [...issues, updated];
  }
  const next = [...issues];
  next[index] = updated;
  return next;
}

export const fetchIssues = createAsyncThunk<
  Issue[],
  string,
  { rejectValue: unknown }
>(
  'issues/fetchIssues',
  async (projectKey, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ issues: Issue[] }>(
        `/api/projects/${projectKey}/issues`,
      );
      return response.data.issues;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  },
);

export const fetchIssueByNumber = createAsyncThunk<
  Issue,
  { projectKey: string; number: number },
  { rejectValue: unknown }
>(
  'issues/fetchIssueByNumber',
  async ({ projectKey, number }, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ issue: Issue }>(
        `/api/projects/${projectKey}/issues/${number}`,
      );
      return response.data.issue;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  },
);

export const addIssue = createAsyncThunk<
  Issue,
  { projectKey: string; payload: IssuePayload },
  { rejectValue: unknown }
>(
  'issues/addIssue',
  async ({ projectKey, payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post<{ issue: Issue }>(
        `/api/projects/${projectKey}/issues`,
        payload,
      );
      return response.data.issue;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  },
);

export const editIssue = createAsyncThunk<
  Issue,
  { issueId: number; payload: IssuePayload },
  { rejectValue: unknown }
>(
  'issues/editIssue',
  async ({ issueId, payload }, { rejectWithValue }) => {
    try {
      const response = await axios.patch<{ issue: Issue }>(
        `/api/issues/${issueId}`,
        payload,
      );
      return response.data.issue;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  },
);

export const transitionIssue = createAsyncThunk<
  Issue,
  { issueId: number; workflowStateId: number },
  { rejectValue: { issueId: number; previousWorkflowState: WorkflowState } }
>(
  'issues/transitionIssue',
  async ({ issueId, workflowStateId }, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const existing = state.issues.issues.find((issue) => issue.id === issueId);
    const previousWorkflowState = existing?.workflow_state;

    try {
      const response = await axios.patch<{ issue: Issue }>(
        `/api/issues/${issueId}`,
        { issue: { workflow_state_id: workflowStateId } },
      );
      return response.data.issue;
    } catch {
      if (!previousWorkflowState) {
        return rejectWithValue({ issueId, previousWorkflowState: { id: 0, name: '', slug: '', position: 0, category: 'backlog' } });
      }
      return rejectWithValue({ issueId, previousWorkflowState });
    }
  },
);

export const createActivity = createAsyncThunk<
  { issueId: number; activity: Activity; issue?: Issue },
  { issueId: number; body: string },
  { rejectValue: unknown }
>(
  'issues/createActivity',
  async ({ issueId, body }, { rejectWithValue }) => {
    try {
      const response = await axios.post<{ activity: Activity }>(
        `/api/issues/${issueId}/activities`,
        { activity: { body, kind: 'comment' } },
      );
      return { issueId, activity: response.data.activity };
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  },
);

export const deleteIssue = createAsyncThunk<
  number,
  { issueId: number },
  { rejectValue: unknown }
>(
  'issues/deleteIssue',
  async ({ issueId }, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/issues/${issueId}`);
      return issueId;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  },
);

export const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    resetAddIssueStatus: (state) => {
      state.addIssueStatus = 'idle';
    },
    resetEditIssueStatus: (state) => {
      state.editIssueStatus = 'idle';
    },
    resetDeleteIssueStatus: (state) => {
      state.deleteIssueStatus = 'idle';
    },
    clearSelectedIssue: (state) => {
      state.selectedIssue = null;
      state.selectedIssueStatus = 'idle';
    },
    optimisticTransitionIssue: (
      state,
      action: { payload: { issueId: number; workflowState: WorkflowState } },
    ) => {
      const { issueId, workflowState } = action.payload;
      state.issues = state.issues.map((issue) => (
        issue.id === issueId ? { ...issue, workflow_state: workflowState } : issue
      ));
      if (state.selectedIssue?.id === issueId) {
        state.selectedIssue = { ...state.selectedIssue, workflow_state: workflowState };
      }
    },
    revertTransitionIssue: (
      state,
      action: { payload: { issueId: number; workflowState: WorkflowState } },
    ) => {
      const { issueId, workflowState } = action.payload;
      state.issues = state.issues.map((issue) => (
        issue.id === issueId ? { ...issue, workflow_state: workflowState } : issue
      ));
      if (state.selectedIssue?.id === issueId) {
        state.selectedIssue = { ...state.selectedIssue, workflow_state: workflowState };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.status = 'idle';
        state.issues = action.payload;
      })
      .addCase(fetchIssues.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchIssueByNumber.pending, (state) => {
        state.selectedIssueStatus = 'loading';
      })
      .addCase(fetchIssueByNumber.fulfilled, (state, action) => {
        state.selectedIssueStatus = 'idle';
        state.selectedIssue = action.payload;
        state.issues = upsertIssue(state.issues, action.payload);
      })
      .addCase(fetchIssueByNumber.rejected, (state) => {
        state.selectedIssueStatus = 'failed';
      })
      .addCase(addIssue.pending, (state) => {
        state.addIssueStatus = 'loading';
      })
      .addCase(addIssue.fulfilled, (state, action) => {
        state.addIssueStatus = 'succeeded';
        state.issues = [...state.issues, action.payload];
      })
      .addCase(addIssue.rejected, (state) => {
        state.addIssueStatus = 'failed';
      })
      .addCase(editIssue.pending, (state) => {
        state.editIssueStatus = 'loading';
      })
      .addCase(editIssue.fulfilled, (state, action) => {
        state.editIssueStatus = 'succeeded';
        state.issues = upsertIssue(state.issues, action.payload);
        if (state.selectedIssue?.id === action.payload.id) {
          state.selectedIssue = action.payload;
        }
      })
      .addCase(editIssue.rejected, (state) => {
        state.editIssueStatus = 'failed';
      })
      .addCase(transitionIssue.pending, (state) => {
        state.transitionIssueStatus = 'loading';
      })
      .addCase(transitionIssue.fulfilled, (state, action) => {
        state.transitionIssueStatus = 'idle';
        state.issues = upsertIssue(state.issues, action.payload);
        if (state.selectedIssue?.id === action.payload.id) {
          state.selectedIssue = action.payload;
        }
      })
      .addCase(transitionIssue.rejected, (state, action) => {
        state.transitionIssueStatus = 'failed';
        const payload = action.payload;
        if (!payload) {
          return;
        }
        state.issues = state.issues.map((issue) => (
          issue.id === payload.issueId
            ? { ...issue, workflow_state: payload.previousWorkflowState }
            : issue
        ));
        if (state.selectedIssue?.id === payload.issueId) {
          state.selectedIssue = {
            ...state.selectedIssue,
            workflow_state: payload.previousWorkflowState,
          };
        }
      })
      .addCase(createActivity.pending, (state) => {
        state.createActivityStatus = 'loading';
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.createActivityStatus = 'idle';
        const { issueId, activity } = action.payload;
        const appendActivity = (issue: Issue): Issue => ({
          ...issue,
          activities: [activity, ...(issue.activities ?? [])],
        });
        state.issues = state.issues.map((issue) => (
          issue.id === issueId ? appendActivity(issue) : issue
        ));
        if (state.selectedIssue?.id === issueId) {
          state.selectedIssue = appendActivity(state.selectedIssue);
        }
      })
      .addCase(createActivity.rejected, (state) => {
        state.createActivityStatus = 'failed';
      })
      .addCase(deleteIssue.pending, (state) => {
        state.deleteIssueStatus = 'loading';
      })
      .addCase(deleteIssue.fulfilled, (state, action) => {
        state.deleteIssueStatus = 'succeeded';
        state.issues = state.issues.filter((issue) => issue.id !== action.payload);
        if (state.selectedIssue?.id === action.payload) {
          state.selectedIssue = null;
        }
      })
      .addCase(deleteIssue.rejected, (state) => {
        state.deleteIssueStatus = 'failed';
      });
  },
});

export const {
  resetAddIssueStatus,
  resetEditIssueStatus,
  resetDeleteIssueStatus,
  clearSelectedIssue,
  optimisticTransitionIssue,
  revertTransitionIssue,
} = issuesSlice.actions;

export const issuesSelector = (state: RootState) => state.issues;

const selectIssues = (state: RootState) => state.issues.issues;

export const selectIssuesByWorkflowState = (stateId: number) => createSelector(
  selectIssues,
  (issues) => issues.filter((issue) => issue.workflow_state.id === stateId),
);

export const selectIssueByNumber = (number: number) => createSelector(
  selectIssues,
  (issues) => issues.find((issue) => issue.number === number) ?? null,
);

export default issuesSlice.reducer;

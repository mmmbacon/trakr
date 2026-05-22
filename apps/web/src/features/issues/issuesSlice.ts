import axios from 'axios';
import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import type { Issue, IssuePayload, IssuesState } from '../../types';
import type { RootState } from '../../app/store';

const initialState: IssuesState = {
  issues: [],
  status: 'idle',
  addIssueStatus: 'idle',
  editIssueStatus: 'idle',
  deleteIssueStatus: 'idle',
};

function getErrorPayload(error: unknown) {
  if (axios.isAxiosError(error) && error.response?.data) {
    return error.response.data;
  }
  return { error: 'Request failed' };
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
        state.issues = state.issues.map((issue) => (
          issue.id === action.payload.id ? action.payload : issue
        ));
      })
      .addCase(editIssue.rejected, (state) => {
        state.editIssueStatus = 'failed';
      })
      .addCase(deleteIssue.pending, (state) => {
        state.deleteIssueStatus = 'loading';
      })
      .addCase(deleteIssue.fulfilled, (state, action) => {
        state.deleteIssueStatus = 'succeeded';
        state.issues = state.issues.filter((issue) => issue.id !== action.payload);
      })
      .addCase(deleteIssue.rejected, (state) => {
        state.deleteIssueStatus = 'failed';
      });
  },
});

export const { resetAddIssueStatus, resetEditIssueStatus, resetDeleteIssueStatus } =
  issuesSlice.actions;

export const issuesSelector = (state: RootState) => state.issues;

const selectIssues = (state: RootState) => state.issues.issues;

export const selectIssuesByWorkflowState = (stateId: number) => createSelector(
  selectIssues,
  (issues) => issues.filter((issue) => issue.workflow_state.id === stateId),
);

export default issuesSlice.reducer;

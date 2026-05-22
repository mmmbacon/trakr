import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Project, ProjectsState, WorkflowState } from '../../types';
import type { RootState } from '../../app/store';

const ACTIVE_PROJECT_KEY = 'trakr-active-project';

function readStoredProjectKey(): string | null {
  try {
    return localStorage.getItem(ACTIVE_PROJECT_KEY);
  } catch {
    return null;
  }
}

function storeProjectKey(key: string) {
  try {
    localStorage.setItem(ACTIVE_PROJECT_KEY, key);
  } catch {
    // localStorage may be unavailable
  }
}

const initialState: ProjectsState = {
  projects: [],
  activeProjectKey: readStoredProjectKey(),
  workflowStates: [],
  status: 'idle',
  workflowStatus: 'idle',
};

function getErrorPayload(error: unknown) {
  if (axios.isAxiosError(error) && error.response?.data) {
    return error.response.data;
  }
  return { error: 'Request failed' };
}

export const fetchProjects = createAsyncThunk<Project[], void, { rejectValue: unknown }>(
  'projects/fetchProjects',
  async (_arg, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ projects: Project[] }>('/api/projects');
      return response.data.projects;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  },
);

export const fetchWorkflowStates = createAsyncThunk<
  WorkflowState[],
  string,
  { rejectValue: unknown }
>(
  'projects/fetchWorkflowStates',
  async (projectKey, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ workflow_states: WorkflowState[] }>(
        `/api/projects/${projectKey}/workflow_states`,
      );
      return response.data.workflow_states;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  },
);

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setActiveProjectKey: (state, action: { payload: string }) => {
      state.activeProjectKey = action.payload;
      storeProjectKey(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'idle';
        state.projects = action.payload;
        if (action.payload.length === 0) {
          state.activeProjectKey = null;
          return;
        }
        const stored = state.activeProjectKey;
        const match = action.payload.find((p) => p.key === stored);
        state.activeProjectKey = match?.key ?? action.payload[0].key;
        if (state.activeProjectKey) {
          storeProjectKey(state.activeProjectKey);
        }
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchWorkflowStates.pending, (state) => {
        state.workflowStatus = 'loading';
      })
      .addCase(fetchWorkflowStates.fulfilled, (state, action) => {
        state.workflowStatus = 'idle';
        state.workflowStates = [...action.payload].sort((a, b) => a.position - b.position);
      })
      .addCase(fetchWorkflowStates.rejected, (state) => {
        state.workflowStatus = 'failed';
      });
  },
});

export const { setActiveProjectKey } = projectsSlice.actions;

export const projectsSelector = (state: RootState) => state.projects;

export const selectActiveProject = (state: RootState) => {
  const { projects, activeProjectKey } = state.projects;
  return projects.find((p) => p.key === activeProjectKey) ?? null;
};

export default projectsSlice.reducer;

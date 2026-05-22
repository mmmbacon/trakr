import axios from 'axios';
import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import type { Job, JobPayload, JobsState } from '../../../types';
import type { RootState } from '../../../app/store';

const initialState: JobsState = {
  jobs: [],
  status: 'idle',
  addJobStatus: 'idle',
  editJobStatus: 'idle',
  deleteJobStatus: 'idle',
};

function getErrorPayload(error: unknown) {
  if (axios.isAxiosError(error) && error.response?.data) {
    return error.response.data;
  }
  return { error: 'Request failed' };
}

export const fetchJobs = createAsyncThunk<Job[], void, { rejectValue: unknown }>(
  'jobs/fetchJobs',
  async (_arg, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ jobs: Job[] }>('/api/jobs');
      return response.data.jobs;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  },
);

export const addJob = createAsyncThunk<Job, JobPayload, { rejectValue: unknown }>(
  'jobs/addJob',
  async ({ job, event }, { rejectWithValue }) => {
    try {
      const response = await axios.post<{ job: Job }>('/api/jobs', { job, event });
      return response.data.job;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  },
);

export const editJob = createAsyncThunk<
  Job,
  { jobId: number; job: JobPayload['job']; event?: JobPayload['event'] },
  { rejectValue: unknown }
>(
  'jobs/editJob',
  async ({ jobId, job, event }, { rejectWithValue }) => {
    try {
      const response = await axios.patch<{ job: Job }>(`/api/jobs/${jobId}`, { job, event });
      return response.data.job;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  },
);

export const deleteJob = createAsyncThunk<number, { jobId: number }, { rejectValue: unknown }>(
  'jobs/deleteJob',
  async ({ jobId }, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/jobs/${jobId}`);
      return jobId;
    } catch (error) {
      return rejectWithValue(getErrorPayload(error));
    }
  },
);

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    resetAddJobStatus: (state) => {
      state.addJobStatus = 'idle';
    },
    resetEditJobStatus: (state) => {
      state.editJobStatus = 'idle';
    },
    resetDeleteJobStatus: (state) => {
      state.deleteJobStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'idle';
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addJob.pending, (state) => {
        state.addJobStatus = 'loading';
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.addJobStatus = 'succeeded';
        state.jobs = [...state.jobs, action.payload];
      })
      .addCase(addJob.rejected, (state) => {
        state.addJobStatus = 'failed';
      })
      .addCase(editJob.pending, (state) => {
        state.editJobStatus = 'loading';
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.editJobStatus = 'succeeded';
        state.jobs = state.jobs.map((job) => (
          job.id === action.payload.id ? action.payload : job
        ));
      })
      .addCase(editJob.rejected, (state) => {
        state.editJobStatus = 'failed';
      })
      .addCase(deleteJob.pending, (state) => {
        state.deleteJobStatus = 'loading';
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.deleteJobStatus = 'succeeded';
        state.jobs = state.jobs.filter((job) => job.id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state) => {
        state.deleteJobStatus = 'failed';
      });
  },
});

export const { resetAddJobStatus, resetEditJobStatus, resetDeleteJobStatus } = jobsSlice.actions;

export const jobsSelector = (state: RootState) => state.jobs;

const selectJobs = (state: RootState) => state.jobs.jobs;

export const selectInterestedJobs = createSelector(
  selectJobs,
  (jobs) => jobs.filter((job) => job.status === 0),
);

export const selectAppliedJobs = createSelector(
  selectJobs,
  (jobs) => jobs.filter((job) => job.status === 1),
);

export const selectInterviewingJobs = createSelector(
  selectJobs,
  (jobs) => jobs.filter((job) => job.status === 2),
);

export const selectOfferJobs = createSelector(
  selectJobs,
  (jobs) => jobs.filter((job) => job.status === 3),
);

export const selectRejectedJobs = createSelector(
  selectJobs,
  (jobs) => jobs.filter((job) => job.status === 4),
);

export default jobsSlice.reducer;

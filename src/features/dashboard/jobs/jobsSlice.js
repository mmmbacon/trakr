/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  jobs: [],
  status: 'idle',
};

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (_undefined, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/jobs');
      return response.data.jobs;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addJob = createAsyncThunk(
  'jobs/addJob',
  async ({ job, event }, { rejectWithValue }) => {
    try {
      const response = await axios.post('api/jobs', { job, event });
      return response.data.job;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const editJob = createAsyncThunk(
  'jobs/editJob',
  async ({ jobId, job, event }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`api/jobs/${jobId}`, { job, event });
      return response.data.job;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
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
        state.status = 'loading';
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.status = 'idle';
        state.jobs = [...state.jobs, action.payload];
      })
      .addCase(addJob.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(editJob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.status = 'idle';
        state.jobs = state.jobs.map((job) => {
          if (job.id === action.payload.id) {
            return action.payload;
          }
          return job;
        });
      })
      .addCase(editJob.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// export const {} = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const jobsSelector = (state) => state.jobs.jobs;
export const selectInterestedJobs = (state) => state.jobs.jobs.filter((job) => job.status === 0);
export const selectAppliedJobs = (state) => state.jobs.jobs.filter((job) => job.status === 1);
export const selectInterviewingJobs = (state) => state.jobs.jobs.filter((job) => job.status === 2);
export const selectOfferJobs = (state) => state.jobs.jobs.filter((job) => job.status === 3);
export const selectRejectedJobs = (state) => state.jobs.jobs.filter((job) => job.status === 4);

export default jobsSlice.reducer;

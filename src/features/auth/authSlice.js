/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  status: 'loading',
  loggingInStatus: 'idle',
};

export const fetchLoggedInStatus = createAsyncThunk(
  'auth/fetchLoggedInStatus',
  async () => {
    try {
      const response = await axios.get('/api/logged_in');
      console.log('response', response);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (email, password) => {
    try {
      const response = await axios.post('/api/login', {
        user: {
          email,
          password,
        },
      });
      console.log('response', response);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInStatus.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.user && action.payload.logged_in) {
          state.user = action.payload.user;
        }
      })
      .addCase(login.pending, (state) => {
        state.loggingInStatus = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loggingInStatus = 'idle';
        if (action.payload.user && action.payload.logged_in) {
          state.user = action.payload.user;
        }
      })
      .addCase(login.rejected, (state) => {
        state.loggingInStatus = 'failed';
      });
  },
});

// export const {} = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const authSelector = (state) => state.auth;

export default authSlice.reducer;

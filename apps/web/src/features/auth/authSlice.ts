import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type {
  AuthSessionResponse,
  AuthState,
  LoginCredentials,
  SignupPayload,
  UpdateUserPayload,
} from '../../types';
import type { RootState } from '../../app/store';

const initialState: AuthState = {
  user: null,
  status: 'loading',
  loggingInStatus: 'idle',
  signUpStatus: 'idle',
  updateStatus: 'idle',
};

function getErrorPayload(error: unknown) {
  if (axios.isAxiosError(error) && error.response?.data) {
    return error.response.data;
  }
  return { error: 'Request failed' };
}

export const fetchLoggedInStatus = createAsyncThunk<
  AuthSessionResponse,
  void,
  { rejectValue: unknown }
>('auth/fetchLoggedInStatus', async (_arg, { rejectWithValue }) => {
  try {
    const response = await axios.get<AuthSessionResponse>('/api/logged_in');
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorPayload(error));
  }
});

export const login = createAsyncThunk<
  AuthSessionResponse,
  LoginCredentials,
  { rejectValue: unknown }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post<AuthSessionResponse>(
      '/api/login',
      { user: { email, password } },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorPayload(error));
  }
});

export const signup = createAsyncThunk<
  AuthSessionResponse,
  SignupPayload,
  { rejectValue: unknown }
>('auth/signup', async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post<AuthSessionResponse>(
      '/api/users',
      { user: payload },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorPayload(error));
  }
});

export const logout = createAsyncThunk<
  AuthSessionResponse,
  void,
  { rejectValue: unknown }
>('auth/logout', async (_arg, { rejectWithValue }) => {
  try {
    const response = await axios.delete<AuthSessionResponse>('/api/logout');
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorPayload(error));
  }
});

export const updateUser = createAsyncThunk<
  AuthSessionResponse,
  UpdateUserPayload,
  { rejectValue: unknown }
>('auth/updateUser', async ({
  userId, first_name, last_name, email, password, password_confirmation,
}, { rejectWithValue }) => {
  try {
    const response = await axios.patch<AuthSessionResponse>(
      `/api/users/${userId}`,
      {
        user: {
          first_name,
          last_name,
          email,
          password,
          password_confirmation,
        },
      },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorPayload(error));
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInStatus.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.user && action.payload.logged_in) {
          state.user = action.payload.user;
        }
      })
      .addCase(fetchLoggedInStatus.rejected, (state) => {
        state.status = 'idle';
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
      })
      .addCase(signup.pending, (state) => {
        state.signUpStatus = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.signUpStatus = 'idle';
        if (action.payload.user && action.payload.status === 'created') {
          state.user = action.payload.user;
        }
      })
      .addCase(signup.rejected, (state) => {
        state.signUpStatus = 'failed';
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.logged_out) {
          state.user = null;
        }
      })
      .addCase(updateUser.pending, (state) => {
        state.updateStatus = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = 'idle';
        if (action.payload.user && action.payload.status === 'updated') {
          state.user = action.payload.user;
        }
      })
      .addCase(updateUser.rejected, (state) => {
        state.updateStatus = 'failed';
      });
  },
});

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;

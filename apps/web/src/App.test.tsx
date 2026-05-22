import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it } from 'vitest';

import App from './App';
import authReducer from './features/auth/authSlice';
import jobsReducer from './features/dashboard/jobs/jobsSlice';
import type { AuthState, JobsState } from './types';

const idleAuthState: AuthState = {
  user: null,
  status: 'idle',
  loggingInStatus: 'idle',
  signUpStatus: 'idle',
  updateStatus: 'idle',
};

const idleJobsState: JobsState = {
  jobs: [],
  status: 'idle',
  addJobStatus: 'idle',
  editJobStatus: 'idle',
  deleteJobStatus: 'idle',
};

function renderApp() {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      jobs: jobsReducer,
    },
    preloadedState: {
      auth: idleAuthState,
      jobs: idleJobsState,
    },
  });

  return render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}

describe('App', () => {
  it('renders the login page for unauthenticated users', async () => {
    window.history.pushState({}, '', '/login');
    const { findByLabelText, getByRole } = renderApp();

    expect(await findByLabelText(/email/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows demo preset login buttons in demo mode', async () => {
    window.history.pushState({}, '', '/login');
    const { findByRole } = renderApp();

    expect(await findByRole('button', { name: /sample dashboard/i })).toBeInTheDocument();
  });
});

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it } from 'vitest';

import App from './App';
import authReducer from './features/auth/authSlice';
import projectsReducer from './features/projects/projectsSlice';
import issuesReducer from './features/issues/issuesSlice';
import type { AuthState, IssuesState, ProjectsState } from './types';

const idleAuthState: AuthState = {
  user: null,
  status: 'idle',
  loggingInStatus: 'idle',
  signUpStatus: 'idle',
  updateStatus: 'idle',
};

const idleProjectsState: ProjectsState = {
  projects: [],
  activeProjectKey: null,
  workflowStates: [],
  status: 'idle',
  workflowStatus: 'idle',
};

const idleIssuesState: IssuesState = {
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

function renderApp() {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      projects: projectsReducer,
      issues: issuesReducer,
    },
    preloadedState: {
      auth: idleAuthState,
      projects: idleProjectsState,
      issues: idleIssuesState,
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

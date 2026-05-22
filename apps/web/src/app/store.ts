import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import projectsReducer from '../features/projects/projectsSlice';
import issuesReducer from '../features/issues/issuesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    issues: issuesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

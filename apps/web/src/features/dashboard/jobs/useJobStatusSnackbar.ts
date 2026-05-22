import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  jobsSelector,
  resetAddJobStatus,
  resetDeleteJobStatus,
  resetEditJobStatus,
} from './jobsSlice';

export function useJobStatusSnackbar() {
  const dispatch = useAppDispatch();
  const { addJobStatus, editJobStatus, deleteJobStatus } = useAppSelector(jobsSelector);
  const [snack, setSnack] = useState('');

  useEffect(() => {
    if (addJobStatus === 'succeeded') {
      setSnack('Successfully Created!');
      dispatch(resetAddJobStatus());
    }
    if (editJobStatus === 'succeeded') {
      setSnack('Successfully Edited!');
      dispatch(resetEditJobStatus());
    }
    if (deleteJobStatus === 'succeeded') {
      setSnack('Successfully Deleted!');
      dispatch(resetDeleteJobStatus());
    }
  }, [addJobStatus, deleteJobStatus, dispatch, editJobStatus]);

  const handleSnackClose = () => setSnack('');

  return { snack, handleSnackClose };
}

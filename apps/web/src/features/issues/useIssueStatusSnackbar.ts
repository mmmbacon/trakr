import { useEffect, useState } from 'react';

import { useAppSelector } from '../../app/hooks';
import { issuesSelector } from './issuesSlice';

export function useIssueStatusSnackbar() {
  const { addIssueStatus, editIssueStatus, deleteIssueStatus } = useAppSelector(issuesSelector);
  const [snack, setSnack] = useState('');

  useEffect(() => {
    if (addIssueStatus === 'succeeded') {
      setSnack('Issue created');
    } else if (editIssueStatus === 'succeeded') {
      setSnack('Issue updated');
    } else if (deleteIssueStatus === 'succeeded') {
      setSnack('Issue deleted');
    }
  }, [addIssueStatus, editIssueStatus, deleteIssueStatus]);

  const handleSnackClose = () => setSnack('');

  return { snack, handleSnackClose };
}

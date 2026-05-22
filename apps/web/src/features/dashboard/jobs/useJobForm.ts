import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { authSelector } from '../../auth/authSlice';
import type { Job, JobEvent, JobPayload } from '../../../types';
import { addJob, deleteJob, editJob } from './jobsSlice';
import { getFirstEvent, parseEventDate } from './jobMappers';

export interface JobFormValues {
  company: string;
  title: string;
  status: number;
  salary: number;
  url: string;
  location: string;
  details: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_socialmedia: string;
  events: string;
  selectedDate: Date | null;
  eventDetails: string;
  eventExpired: boolean;
  eventLocation: string;
  resume_url: string;
  coverletter_url: string;
  extra_url: string;
}

const emptyFormValues = (): JobFormValues => ({
  company: '',
  title: '',
  status: 0,
  salary: 0,
  url: '',
  location: '',
  details: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  contact_socialmedia: '',
  events: '',
  selectedDate: null,
  eventDetails: '',
  eventExpired: false,
  eventLocation: '',
  resume_url: '',
  coverletter_url: '',
  extra_url: '',
});

function jobToFormValues(job?: Job): JobFormValues {
  if (!job) {
    return emptyFormValues();
  }

  const firstEvent = getFirstEvent(job);

  return {
    company: job.company,
    title: job.title,
    status: job.status,
    salary: job.salary ?? 0,
    url: job.url,
    location: job.location,
    details: job.details,
    contact_name: job.contact_name,
    contact_email: job.contact_email,
    contact_phone: job.contact_phone,
    contact_socialmedia: job.contact_socialmedia,
    events: firstEvent?.title ?? '',
    selectedDate: parseEventDate(firstEvent?.date),
    eventDetails: firstEvent?.details ?? '',
    eventExpired: firstEvent?.expired ?? false,
    eventLocation: firstEvent?.location ?? '',
    resume_url: job.resume_url,
    coverletter_url: job.coverletter_url,
    extra_url: job.extra_url,
  };
}

interface UseJobFormOptions {
  job?: Job;
  open: boolean;
  isEditMode: boolean;
  onClose: () => void;
}

export function useJobForm({
  job,
  open,
  isEditMode,
  onClose,
}: UseJobFormOptions) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(authSelector);
  const [values, setValues] = useState<JobFormValues>(() => jobToFormValues(job));
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setValues(jobToFormValues(job));
      setError('');
    }
  }, [open, job]);

  useEffect(() => {
    const selectedDate = values.selectedDate;
    if (!selectedDate) {
      setValues((prev) => (
        prev.eventExpired ? { ...prev, eventExpired: false } : prev
      ));
      return;
    }

    const expired = new Date(selectedDate).getTime() < Date.now();
    setValues((prev) => (
      prev.eventExpired === expired ? prev : { ...prev, eventExpired: expired }
    ));
  }, [values.selectedDate]);

  const setField = useCallback(<K extends keyof JobFormValues>(
    field: K,
    value: JobFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues(emptyFormValues());
    setError('');
  }, []);

  const handleSubmit = async () => {
    if (values.company === '' || values.title === '') {
      setError('Must include both Company Name and Job Title');
      return;
    }

    if (!user) {
      setError('You must be logged in to save');
      return;
    }

    if (!Number.isFinite(values.salary)) {
      setError('Salary must be a number');
      return;
    }

    const jobPayload: JobPayload['job'] & { user_id: number } = {
      user_id: user.id,
      company: values.company,
      title: values.title,
      status: values.status,
      salary: values.salary,
      url: values.url,
      location: values.location,
      details: values.details,
      contact_name: values.contact_name,
      contact_email: values.contact_email,
      contact_phone: values.contact_phone,
      contact_socialmedia: values.contact_socialmedia,
      resume_url: values.resume_url,
      coverletter_url: values.coverletter_url,
      extra_url: values.extra_url,
    };

    const event: Partial<JobEvent> & { job_id?: number } = {
      job_id: job?.id,
      title: values.events,
      expired: values.eventExpired,
      date: values.selectedDate ? values.selectedDate.toISOString() : undefined,
      details: values.eventDetails,
      location: values.eventLocation,
    };

    if (
      ((!event.title && event.date) || (event.title && !event.date))
      || ((!event.title && !event.date) && (event.details || event.location))
    ) {
      setError('Must include both Event Title and Event Date');
      return;
    }

    const hasEvent = Boolean(event.title || event.date || event.details || event.location);
    let actionResult;
    let selectedAction;

    if (job?.id) {
      selectedAction = editJob;
      actionResult = await dispatch(
        hasEvent
          ? selectedAction({ jobId: job.id, job: jobPayload, event })
          : selectedAction({ jobId: job.id, job: jobPayload }),
      );
    } else {
      selectedAction = addJob;
      actionResult = await dispatch(
        hasEvent
          ? selectedAction({ job: jobPayload, event })
          : selectedAction({ job: jobPayload }),
      );
    }

    if (selectedAction.rejected.match(actionResult)) {
      setError('Action failed, please try again');
    } else if (selectedAction.fulfilled.match(actionResult)) {
      onClose();
      if (!isEditMode) {
        reset();
      }
    }
  };

  const handleDelete = async () => {
    if (!job?.id) {
      return;
    }

    const actionResult = await dispatch(deleteJob({ jobId: job.id }));

    if (deleteJob.rejected.match(actionResult)) {
      setError('Delete failed, please try again');
      return;
    }

    onClose();
  };

  return {
    values,
    setField,
    error,
    reset,
    handleSubmit,
    handleDelete,
  };
}

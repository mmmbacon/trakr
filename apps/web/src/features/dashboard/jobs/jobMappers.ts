import type { Job } from '../../../types';

export function isEventExpired(date: string | undefined): boolean {
  if (!date) {
    return false;
  }

  const expiryDate = new Date(date);
  if (Number.isNaN(expiryDate.getTime())) {
    return false;
  }

  return expiryDate.getTime() < Date.now();
}

export function getFirstEvent(job: Job) {
  return job.events.length > 0 ? job.events[0] : null;
}

export function parseEventDate(date: string | undefined): Date | null {
  if (!date) {
    return null;
  }

  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function jobToJobItemProps(job: Job) {
  return { job };
}

import { useCompanyLogo } from '../features/dashboard/jobs/useCompanyLogo';
import { getFirstEvent, isEventExpired } from '../features/dashboard/jobs/jobMappers';
import type { Job } from '../types';

export function useJobItemState(job: Job) {
  const logo = useCompanyLogo(job.company);
  const firstEvent = getFirstEvent(job);
  const eventExpired = isEventExpired(firstEvent?.date);

  return { logo, eventExpired };
}

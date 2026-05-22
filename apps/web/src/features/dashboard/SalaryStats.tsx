import { useMemo } from 'react';

import type { Job } from '../../types';
import { useAppSelector } from '../../app/hooks';
import { SalaryBarChart } from '../../components/ui';
import {
  selectInterestedJobs,
  selectAppliedJobs,
  selectInterviewingJobs,
  selectOfferJobs,
  selectRejectedJobs,
} from './jobs/jobsSlice';

interface ChartDatum {
  status: string;
  val: number;
}

const SALARY_BUCKETS: Array<{ label: string; min: number | null; max: number | null }> = [
  { label: 'No Salary Data', min: null, max: null },
  { label: '< $25k', min: 1, max: 25000 },
  { label: '$25k - $50k', min: 25000, max: 50000 },
  { label: '$50k - $75k', min: 50000, max: 75000 },
  { label: '$75k - $100k', min: 75000, max: 100000 },
  { label: '$100k - $125k', min: 100000, max: 125000 },
  { label: '$125k - $150k', min: 125000, max: 150000 },
  { label: '$150k - $175k', min: 150000, max: 175000 },
  { label: '$175k+', min: 175000, max: null },
];

function countSalaryBuckets(categories: Job[][]): ChartDatum[] {
  const counts = SALARY_BUCKETS.map(() => 0);

  categories.flat().forEach((job) => {
    const salary = job.salary;
    const bucketIndex = SALARY_BUCKETS.findIndex(({ min, max }) => {
      if (min === null && max === null) {
        return salary === null || salary === 0;
      }
      if (salary === null || salary === 0) {
        return false;
      }
      if (max === null) {
        return salary >= (min ?? 0);
      }
      return salary >= (min ?? 0) && salary < max;
    });

    if (bucketIndex >= 0) {
      counts[bucketIndex] += 1;
    }
  });

  return SALARY_BUCKETS
    .map((bucket, index) => ({
      status: bucket.label,
      val: counts[index],
    }))
    .filter((bucket) => bucket.val > 0);
}

const SalaryStats = () => {
  const interestedJobs = useAppSelector(selectInterestedJobs);
  const appliedJobs = useAppSelector(selectAppliedJobs);
  const interviewingJobs = useAppSelector(selectInterviewingJobs);
  const offerJobs = useAppSelector(selectOfferJobs);
  const rejectedJobs = useAppSelector(selectRejectedJobs);

  const chartData = useMemo(
    () => countSalaryBuckets([
      interestedJobs,
      appliedJobs,
      interviewingJobs,
      offerJobs,
      rejectedJobs,
    ]),
    [interestedJobs, appliedJobs, interviewingJobs, offerJobs, rejectedJobs],
  );

  if (chartData.length === 0) {
    return null;
  }

  return (
    <SalaryBarChart
      data={chartData.map((item) => ({
        label: item.status,
        value: item.val,
      }))}
    />
  );
};

export default SalaryStats;

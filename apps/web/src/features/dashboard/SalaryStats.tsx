import { useMemo } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import type { Job } from '../../types';
import { useAppSelector } from '../../app/hooks';
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

function countSalaryBuckets(categories: Job[][]): ChartDatum[] {
  const salariesNone: (number | null)[] = [];
  const salaries0: number[] = [];
  const salaries1: number[] = [];
  const salaries2: number[] = [];
  const salaries3: number[] = [];
  const salaries4: number[] = [];
  const salaries5: number[] = [];
  const salaries6: number[] = [];
  const salaries7: number[] = [];

  const salaryCount = (category: Job[]) => {
    category.forEach((data) => {
      if (data.salary === null) {
        salariesNone.push(data.salary);
      }
      if (data.salary !== null && data.salary > 0 && data.salary < 25000) {
        salaries0.push(data.salary);
      } else if (data.salary !== null && data.salary >= 25000 && data.salary < 50000) {
        salaries1.push(data.salary);
      } else if (data.salary !== null && data.salary >= 50000 && data.salary < 75000) {
        salaries2.push(data.salary);
      } else if (data.salary !== null && data.salary >= 75000 && data.salary < 100000) {
        salaries3.push(data.salary);
      } else if (data.salary !== null && data.salary >= 100000 && data.salary < 125000) {
        salaries4.push(data.salary);
      } else if (data.salary !== null && data.salary >= 125000 && data.salary < 150000) {
        salaries5.push(data.salary);
      } else if (data.salary !== null && data.salary > 150000 && data.salary < 175000) {
        salaries6.push(data.salary);
      } else if (data.salary !== null && data.salary > 175000) {
        salaries7.push(data.salary);
      }
    });
  };

  categories.forEach(salaryCount);

  return [
    { status: 'No Salary Data', val: salariesNone.length },
    { status: '$0 - $25k', val: salaries0.length },
    { status: '$25k - $50k', val: salaries1.length },
    { status: '$50k - $75k', val: salaries2.length },
    { status: '$75k - $100k', val: salaries3.length },
    { status: '$100k - $125k', val: salaries4.length },
    { status: '$125k - $150k', val: salaries5.length },
    { status: '$150k - $175k', val: salaries6.length },
    { status: '$175k+', val: salaries7.length },
  ];
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

  return (
    <BarChart
      height={350}
      xAxis={[{
        scaleType: 'band',
        data: chartData.map((d) => d.status),
      }]}
      series={[{
        data: chartData.map((d) => d.val),
        color: '#577590',
        label: 'Jobs',
      }]}
    />
  );
};

export default SalaryStats;

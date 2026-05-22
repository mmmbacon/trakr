import { useAppSelector } from '../../app/hooks';
import { getJobStatusColors } from '../../theme';
import SalaryStats from './SalaryStats';
import {
  Box,
  Container,
  Paper,
  StatusPieChart,
  Typography,
  useTheme,
} from '../../components/ui';
import {
  selectInterestedJobs,
  selectAppliedJobs,
  selectInterviewingJobs,
  selectOfferJobs,
  selectRejectedJobs,
} from './jobs/jobsSlice';

const JobStats = () => {
  const theme = useTheme();
  const interestedJobs = useAppSelector(selectInterestedJobs);
  const appliedJobs = useAppSelector(selectAppliedJobs);
  const interviewingJobs = useAppSelector(selectInterviewingJobs);
  const offerJobs = useAppSelector(selectOfferJobs);
  const rejectedJobs = useAppSelector(selectRejectedJobs);

  const chartData = [
    { status: 'Interested Jobs', val: interestedJobs.length },
    { status: 'Applied Jobs', val: appliedJobs.length },
    { status: 'Interviewing Jobs', val: interviewingJobs.length },
    { status: 'Offered Jobs', val: offerJobs.length },
    { status: 'Rejected Jobs', val: rejectedJobs.length },
  ];

  const statusSummary = chartData
    .map((item) => `${item.status}: ${item.val}`)
    .join(', ');

  return (
    <Container maxWidth="lg" className="stats-container">
      <Paper className="stats-paper">
        <Box className="stats-heading-wrap">
          <Typography id="job-status-heading" variant="h4" fontWeight={600}>
            Job Application Status
          </Typography>
        </Box>
        <Box
          className="stats-chart-wrap"
          role="img"
          aria-labelledby="job-status-heading"
          aria-label={`Job application status chart. ${statusSummary}`}
        >
          <StatusPieChart
            data={chartData.map((item, index) => ({
              id: index,
              value: item.val,
              label: item.status,
            }))}
            colors={[...getJobStatusColors(theme)]}
            ariaLabel={`Job application status chart. ${statusSummary}`}
          />
        </Box>
        <Box className="stats-heading-wrap" mt={2}>
          <Typography id="salary-overview-heading" variant="h4" fontWeight={600}>
            Salary Overview
          </Typography>
          <Box role="img" aria-labelledby="salary-overview-heading">
            <SalaryStats color={theme.palette.primary.main} />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default JobStats;

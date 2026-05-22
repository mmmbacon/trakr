import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material/styles';
import { useAppSelector } from '../../app/hooks';
import { getJobStatusColors } from '../../theme';
import SalaryStats from './SalaryStats';
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
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={4}>
          <Typography id="job-status-heading" variant="h5" align="center">
            Job Application Status
          </Typography>
          <Box
            role="img"
            aria-labelledby="job-status-heading"
            aria-label={`Job application status chart. ${statusSummary}`}
          >
            <PieChart
              height={320}
              colors={[...getJobStatusColors(theme)]}
              series={[
                {
                  data: chartData.map((item, index) => ({
                    id: index,
                    value: item.val,
                    label: item.status,
                  })),
                  innerRadius: '60%',
                },
              ]}
            />
          </Box>
          <Typography id="salary-overview-heading" variant="h5" align="center">
            Salary Overview
          </Typography>
          <Box role="img" aria-labelledby="salary-overview-heading">
            <SalaryStats color={theme.palette.primary.main} />
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default JobStats;

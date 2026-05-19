import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { useAppSelector } from '../../app/hooks';
import SalaryStats from './SalaryStats';
import {
  selectInterestedJobs,
  selectAppliedJobs,
  selectInterviewingJobs,
  selectOfferJobs,
  selectRejectedJobs,
} from './jobs/jobsSlice';

const jobPalette = ['#F9C74F', '#F8961E', '#90BE6D', '#43AA8B', '#F94144'];

const JobStats = () => {
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

  return (
    <Container
      maxWidth="md"
      sx={{
        width: '100%',
        py: '25px',
      }}
    >
      <Paper sx={{ width: '100%', p: '25px' }}>
        <Box
          mb={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 600 }} variant="h4">
            Job Application Status
          </Typography>
        </Box>
        <Box mb={5}>
          <PieChart
            height={320}
            colors={jobPalette}
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
        <Box
          mb={4}
          mt={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 600 }} variant="h4">
            Salary Overview
          </Typography>
        </Box>
        <Box>
          <SalaryStats />
        </Box>
      </Paper>
    </Container>
  );
};

export default JobStats;

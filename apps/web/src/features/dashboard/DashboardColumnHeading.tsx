import { Box, Paper, Typography } from '@mui/material';

export interface DashboardColumnHeadingProps {
  title?: string;
  tickUrl?: string;
  color?: string;
}

const headingPaperSx = {
  height: 'auto',
  padding: '10px',
};

const titleSx = {
  color: '#3b3b3b',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: 3,
  fontFamily: 'Montserrat, sans-serif',
};

const DashboardColumnHeading = ({
  title = 'Heading',
  tickUrl = 'https://i.imgur.com/rr4anU1.png',
  color = '#3b3b3b',
}: DashboardColumnHeadingProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      p: '5px',
      m: '-5px',
      mb: '1px',
    }}
  >
    <Paper elevation={1} sx={headingPaperSx}>
      <Box
        sx={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ position: 'absolute', mt: '-5px', ml: '-5px' }}>
          <img src={tickUrl} alt="" height={20} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            ...headingPaperSx,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" sx={{ ...titleSx, color }}>
            {title}
          </Typography>
        </Box>
      </Box>
    </Paper>
  </Box>
);

export default DashboardColumnHeading;

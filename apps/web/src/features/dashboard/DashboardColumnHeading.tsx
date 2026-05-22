import { Box, Paper, Typography } from '@mui/material';

export interface DashboardColumnHeadingProps {
  title?: string;
  tickUrl?: string;
  color?: string;
}

const headingPaperSx = {
  height: 'auto',
  padding: '10px 8px 10px 24px',
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
    <Paper elevation={1} sx={{ ...headingPaperSx, position: 'relative' }}>
      <Box
        component="img"
        src={tickUrl}
        alt=""
        height={20}
        sx={{
          position: 'absolute',
          top: 6,
          left: 4,
        }}
      />
      <Typography
        component="h2"
        variant="subtitle2"
        sx={{
          color,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          fontFamily: 'Montserrat, sans-serif',
          textAlign: 'center',
          lineHeight: 1.2,
          wordBreak: 'break-word',
        }}
      >
        {title}
      </Typography>
    </Paper>
  </Box>
);

export default DashboardColumnHeading;

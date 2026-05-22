import { Box, Paper, Typography } from '../../components/ui';

export interface DashboardColumnHeadingProps {
  title?: string;
  tickUrl?: string;
  color?: string;
}

const DashboardColumnHeading = ({
  title = 'Heading',
  tickUrl = 'https://i.imgur.com/rr4anU1.png',
  color = '#3b3b3b',
}: DashboardColumnHeadingProps) => (
  <Box className="column-heading-wrap">
    <Paper elevation={1} className="column-heading-paper">
      <Box
        component="img"
        src={tickUrl}
        alt=""
        height={20}
        className="column-heading-tick"
      />
      <Typography
        component="h2"
        variant="subtitle1"
        className="column-heading-title"
        style={{ color }}
      >
        {title}
      </Typography>
    </Paper>
  </Box>
);

export default DashboardColumnHeading;

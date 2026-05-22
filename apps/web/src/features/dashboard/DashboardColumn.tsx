import { Box } from '@mui/material';
import type { Job } from '../../types';
import JobItem from '../../components/JobItem';
import DashboardColumnHeading from './DashboardColumnHeading';

export interface DashboardColumnProps {
  title?: string;
  color?: string;
  items?: Job[];
  index?: number;
  tickUrl?: string;
}

const DashboardColumn = ({
  title = 'Category',
  color = '#ee6a7c',
  items = [],
  tickUrl = 'https://i.imgur.com/rr4anU1.png',
}: DashboardColumnProps) => (
  <Box sx={{ width: 1, height: '100%', p: '5px' }}>
    <DashboardColumnHeading title={title} color={color} tickUrl={tickUrl} />
    {items.map((item) => (
      <JobItem key={item.id} job={item} />
    ))}
  </Box>
);

export default DashboardColumn;

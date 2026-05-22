import type { Job } from '../../types';
import JobItem from '../../components/JobItem';
import { Box } from '../../components/ui';
import DashboardColumnHeading from './DashboardColumnHeading';

export interface DashboardColumnProps {
  title?: string;
  color?: string;
  items?: Job[];
}

const DashboardColumn = ({
  title = 'Category',
  color,
  items = [],
}: DashboardColumnProps) => (
  <Box height="100%">
    <DashboardColumnHeading title={title} color={color} count={items.length} />
    {items.map((item) => (
      <JobItem key={item.id} job={item} />
    ))}
  </Box>
);

export default DashboardColumn;

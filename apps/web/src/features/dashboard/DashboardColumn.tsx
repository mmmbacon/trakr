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
    <Box display="flex" flexDirection="column" gap={1}>
      {items.map((item) => (
        <JobItem key={item.id} job={item} />
      ))}
    </Box>
  </Box>
);

export default DashboardColumn;

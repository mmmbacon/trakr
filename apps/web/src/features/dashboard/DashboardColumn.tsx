import type { Issue } from '../../types';
import IssueItem from '../../components/IssueItem';
import { Box } from '../../components/ui';
import DashboardColumnHeading from './DashboardColumnHeading';

export interface DashboardColumnProps {
  title?: string;
  color?: string;
  items?: Issue[];
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
        <IssueItem key={item.id} issue={item} />
      ))}
    </Box>
  </Box>
);

export default DashboardColumn;

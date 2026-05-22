import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Box from '@mui/material/Box';

import type { Issue } from '../../types';
import DashboardColumnHeading from './DashboardColumnHeading';
import IssueCard from './IssueCard';

export interface BoardColumnProps {
  stateId: number;
  title?: string;
  color?: string;
  items?: Issue[];
  onOpenIssue: (issueNumber: number) => void;
}

function DraggableIssueCard({
  issue,
  onOpenIssue,
}: {
  issue: Issue;
  onOpenIssue: (issueNumber: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: issue.id,
  });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  return (
    <div ref={setNodeRef} style={style}>
      <IssueCard
        issue={issue}
        onOpen={() => onOpenIssue(issue.number)}
        isDragging={isDragging}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

export default function BoardColumn({
  stateId,
  title = 'Category',
  color,
  items = [],
  onOpenIssue,
}: BoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stateId });

  return (
    <Box height="100%">
      <DashboardColumnHeading title={title} color={color} count={items.length} />
      <Box
        ref={setNodeRef}
        display="flex"
        flexDirection="column"
        gap={0.5}
        minHeight={120}
        sx={{
          borderRadius: 'var(--radius-sm)',
          bgcolor: isOver ? 'action.hover' : 'transparent',
          transition: 'background-color 0.15s ease',
          p: 0.25,
          mx: -0.25,
        }}
      >
        {items.map((item) => (
          <DraggableIssueCard key={item.id} issue={item} onOpenIssue={onOpenIssue} />
        ))}
      </Box>
    </Box>
  );
}

import { useMemo, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';

import type { Issue } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { projectsSelector } from '../projects/projectsSlice';
import {
  optimisticTransitionIssue,
  transitionIssue,
} from '../issues/issuesSlice';
import { Box, Grid } from '../../components/ui';
import IssueCard from '../../adapters/mui/IssueCard';
import BoardColumn from '../../adapters/mui/BoardColumn';
import KanbanActionBar from './KanbanActionBar';

interface KanbanColumnConfig {
  title: string;
  color: string;
  stateId: number;
  items: Issue[];
}

interface KanbanBoardProps {
  columns: KanbanColumnConfig[];
  onAddIssueClick: () => void;
  projectName?: string;
  onOpenIssue: (issueNumber: number) => void;
}

export default function KanbanBoard({
  columns,
  onAddIssueClick,
  projectName,
  onOpenIssue,
}: KanbanBoardProps) {
  const dispatch = useAppDispatch();
  const { workflowStates } = useAppSelector(projectsSelector);
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const issueById = useMemo(() => {
    const map = new Map<number, Issue>();
    columns.forEach((column) => {
      column.items.forEach((issue) => map.set(issue.id, issue));
    });
    return map;
  }, [columns]);

  const handleDragStart = (event: DragStartEvent) => {
    const issue = issueById.get(Number(event.active.id));
    setActiveIssue(issue ?? null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveIssue(null);
    const { active, over } = event;
    if (!over) {
      return;
    }

    const issueId = Number(active.id);
    const targetStateId = Number(over.id);
    const issue = issueById.get(issueId);
    if (!issue || issue.workflow_state.id === targetStateId) {
      return;
    }

    const targetState = workflowStates.find((state) => state.id === targetStateId);
    if (!targetState) {
      return;
    }

    dispatch(optimisticTransitionIssue({ issueId, workflowState: targetState }));
    const result = await dispatch(transitionIssue({ issueId, workflowStateId: targetStateId }));
    if (transitionIssue.rejected.match(result)) {
      dispatch(optimisticTransitionIssue({
        issueId,
        workflowState: issue.workflow_state,
      }));
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <KanbanActionBar onAddIssueClick={onAddIssueClick} projectName={projectName} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={(event) => void handleDragEnd(event)}
      >
        <Box flex={1} minHeight={0} px={1.5} py={1} overflow="auto">
          <Grid
            container
            id="dashboard-columns"
            component="section"
            aria-label="Issue board"
            spacing={1}
            wrap="nowrap"
            className="kanban-columns"
          >
            {columns.map((column) => (
              <Grid item key={column.title} className="kanban-column">
                <BoardColumn
                  stateId={column.stateId}
                  title={column.title}
                  color={column.color}
                  items={column.items}
                  onOpenIssue={onOpenIssue}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <DragOverlay>
          {activeIssue ? (
            <IssueCard issue={activeIssue} onOpen={() => undefined} isDragging />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Box>
  );
}

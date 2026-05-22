import { getWorkflowColor } from '../../tokens';
import type { WorkflowState } from '../../types';

export interface KanbanColumnConfig {
  title: string;
  slug: string;
  color: string;
  stateId: number;
}

export function getKanbanColumnsFromStates(states: WorkflowState[]): KanbanColumnConfig[] {
  return [...states]
    .sort((a, b) => a.position - b.position)
    .map((state) => ({
      title: state.name,
      slug: state.slug,
      color: getWorkflowColor(state.slug),
      stateId: state.id,
    }));
}

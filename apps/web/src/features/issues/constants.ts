import { priorities, type Priority } from '../../tokens';

export const PRIORITY_OPTIONS = priorities.map((value) => ({
  value,
  label: value === 'none' ? 'No priority' : value.charAt(0).toUpperCase() + value.slice(1),
}));

export const DEFAULT_PRIORITY: Priority = 'none';

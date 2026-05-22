export const colors = {
  primary: '#577590',
  secondary: '#43aa8b',
  error: '#F94144',
  warning: '#F3722C',
  info: '#43aa8b',
  success: '#90be6d',
  neutral: '#a9a9a9',
  text: '#2e2e2e',
  textSecondary: 'rgba(0, 0, 0, 0.6)',
  iconMuted: '#d9d9d9',
  sidebarIcon: '#3b3b3b',
  white: '#ffffff',
} as const;

/** Pivot palette — see docs/planning/design-system.md */
export const semanticColors = {
  bg: 'var(--color-bg)',
  surface: 'var(--color-surface)',
  border: 'var(--color-border)',
  textPrimary: 'var(--color-text-primary)',
  textMuted: 'var(--color-text-muted)',
  accent: 'var(--color-accent)',
  human: 'var(--color-human)',
  agent: 'var(--color-agent)',
} as const;

/** Hex values for MUI (alpha(), palette). CSS vars live in tokens.css for stylesheets. */
export const workflowColors = {
  backlog: '#a1a1aa',
  triage: '#eab308',
  ready: '#3b82f6',
  inProgress: '#8b5cf6',
  done: '#22c55e',
} as const;

const workflowSlugToColorKey = {
  backlog: 'backlog',
  triage: 'triage',
  ready: 'ready',
  in_progress: 'inProgress',
  done: 'done',
} as const;

export type WorkflowSlug = keyof typeof workflowSlugToColorKey;

export function getWorkflowColor(slug: string): string {
  const key = workflowSlugToColorKey[slug as WorkflowSlug];
  if (!key) {
    return workflowColors.backlog;
  }
  return workflowColors[key];
}

export const fonts = {
  heading: 'Montserrat, sans-serif',
  body: 'Source Sans Pro, sans-serif',
  sans: 'var(--font-sans)',
  mono: 'var(--font-mono)',
} as const;

export const typography = {
  xs: 'var(--text-xs)',
  sm: 'var(--text-sm)',
  base: 'var(--text-base)',
  lg: 'var(--text-lg)',
} as const;

export const spacing = {
  1: 'var(--space-1)',
  2: 'var(--space-2)',
  3: 'var(--space-3)',
  4: 'var(--space-4)',
  5: 'var(--space-5)',
} as const;

export const radii = {
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
} as const;

/** @deprecated Phase 1 — replace with workflowColors */
export const kanbanColors = {
  interested: '#F9C74F',
  applied: '#F8961E',
  interviewing: '#90BE6D',
  offer: '#43AA8B',
  rejected: '#F94144',
} as const;

/** @deprecated Phase 1 */
export const jobStatusChartPalette = [
  kanbanColors.interested,
  kanbanColors.applied,
  kanbanColors.interviewing,
  kanbanColors.offer,
  kanbanColors.rejected,
] as const;

export const priorities = ['none', 'low', 'medium', 'high', 'urgent'] as const;
export type Priority = (typeof priorities)[number];

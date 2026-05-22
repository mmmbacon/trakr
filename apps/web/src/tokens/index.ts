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

export const fonts = {
  heading: 'Montserrat, sans-serif',
  body: 'Source Sans Pro, sans-serif',
} as const;

export const kanbanColors = {
  interested: '#F9C74F',
  applied: '#F8961E',
  interviewing: '#90BE6D',
  offer: '#43AA8B',
  rejected: '#F94144',
} as const;

export const jobStatusChartPalette = [
  kanbanColors.interested,
  kanbanColors.applied,
  kanbanColors.interviewing,
  kanbanColors.offer,
  kanbanColors.rejected,
] as const;

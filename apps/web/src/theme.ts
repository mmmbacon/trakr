import {
  createTheme,
  type PaletteMode,
  type Theme,
} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    jobStatus: {
      interested: string;
      applied: string;
      interviewing: string;
      offer: string;
      rejected: string;
    };
  }

  interface PaletteOptions {
    jobStatus?: {
      interested?: string;
      applied?: string;
      interviewing?: string;
      offer?: string;
      rejected?: string;
    };
  }
}

const sharedPalette = {
  primary: {
    main: '#577590',
  },
  secondary: {
    main: '#43aa8b',
    contrastText: '#fff',
  },
  error: {
    main: '#F94144',
    contrastText: '#fff',
  },
  warning: {
    main: '#F3722C',
  },
  info: {
    main: '#43aa8b',
  },
  success: {
    main: '#90be6d',
  },
  jobStatus: {
    interested: '#F9C74F',
    applied: '#F8961E',
    interviewing: '#90BE6D',
    offer: '#43AA8B',
    rejected: '#F94144',
  },
};

export function createAppTheme(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
      ...sharedPalette,
    },
  });
}

export function getJobStatusColors(theme: Theme) {
  return [
    theme.palette.jobStatus.interested,
    theme.palette.jobStatus.applied,
    theme.palette.jobStatus.interviewing,
    theme.palette.jobStatus.offer,
    theme.palette.jobStatus.rejected,
  ] as const;
}

export function getKanbanColumns(theme: Theme) {
  return [
    { title: 'Interested', color: theme.palette.jobStatus.interested },
    { title: 'Applied', color: theme.palette.jobStatus.applied },
    { title: 'Interviewing', color: theme.palette.jobStatus.interviewing },
    { title: 'Offer', color: theme.palette.jobStatus.offer },
    { title: 'Rejected', color: theme.palette.jobStatus.rejected },
  ] as const;
}

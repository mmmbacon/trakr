import { createTheme } from '@mui/material/styles';

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

const theme = createTheme({
  palette: {
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
  },
});

export const JOB_STATUS_COLORS = [
  theme.palette.jobStatus.interested,
  theme.palette.jobStatus.applied,
  theme.palette.jobStatus.interviewing,
  theme.palette.jobStatus.offer,
  theme.palette.jobStatus.rejected,
] as const;

export default theme;

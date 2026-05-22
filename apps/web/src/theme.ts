import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#577590',
    },
    secondary: {
      main: '#43aa8b',
    },
    error: {
      main: '#F94144',
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
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h4: {
      color: '#2e2e2e',
      fontSize: '1.2rem',
      fontWeight: 400,
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.2rem',
      },
    },
    h5: {
      color: '#2e2e2e',
      fontSize: '1.2rem',
      marginBottom: '0.1em',
      fontWeight: 500,
      '@media (max-width:600px)': {
        fontSize: '1.1rem',
      },
    },
    body1: {
      color: '#2e2e2e',
      fontSize: '0.8rem',
      fontWeight: 400,
      '@media (max-width:600px)': {
        fontSize: '0.9rem',
      },
    },
    body2: {
      fontSize: '0.7rem',
      fontWeight: 400,
    },
  },
});

theme.typography.h4 = {
  ...theme.typography.h4,
  [theme.breakpoints.up('xl')]: {
    fontSize: '1.8rem',
  },
};

theme.typography.h5 = {
  ...theme.typography.h5,
  [theme.breakpoints.up('xl')]: {
    fontSize: '1.4rem',
  },
};

theme.typography.body1 = {
  ...theme.typography.body1,
  [theme.breakpoints.up('xl')]: {
    fontSize: '1.0rem',
  },
};

theme.typography.body2 = {
  ...theme.typography.body2,
  [theme.breakpoints.up('xl')]: {
    fontSize: '0.9rem',
  },
};

export default theme;

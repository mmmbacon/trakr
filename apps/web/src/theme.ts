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
    spacing: 6,
    palette: {
      mode,
      ...sharedPalette,
    },
    typography: {
      htmlFontSize: 14,
      fontFamily: `'Source Sans Pro', system-ui, sans-serif`,
      h6: {
        fontSize: '0.9375rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      subtitle2: {
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
        lineHeight: 1.3,
      },
      body2: {
        fontSize: '0.8125rem',
        lineHeight: 1.35,
      },
      caption: {
        fontSize: '0.6875rem',
        lineHeight: 1.3,
      },
    },
    shape: {
      borderRadius: 6,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontSize: '0.8125rem',
          },
        },
      },
      MuiToolbar: {
        defaultProps: {
          variant: 'dense',
        },
        styleOverrides: {
          dense: {
            minHeight: 44,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            paddingTop: 4,
            paddingBottom: 4,
            minHeight: 32,
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 32,
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontSize: '0.8125rem',
          },
        },
      },
      MuiButton: {
        defaultProps: {
          size: 'small',
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontSize: '0.8125rem',
            fontWeight: 500,
            lineHeight: 1.35,
            borderRadius: 4,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          sizeSmall: {
            minHeight: 26,
            padding: '2px 8px',
          },
          containedSizeSmall: {
            padding: '2px 8px',
          },
          outlinedSizeSmall: {
            padding: '1px 7px',
          },
          textSizeSmall: {
            padding: '2px 6px',
          },
          startIcon: {
            marginRight: 4,
            marginLeft: -2,
            '& > *:nth-of-type(1)': {
              fontSize: '1rem',
            },
          },
          endIcon: {
            marginLeft: 4,
          },
        },
      },
      MuiIconButton: {
        defaultProps: {
          size: 'small',
        },
        styleOverrides: {
          root: {
            borderRadius: 4,
          },
          sizeSmall: {
            padding: 3,
          },
        },
      },
      MuiFab: {
        defaultProps: {
          size: 'small',
        },
        styleOverrides: {
          root: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          sizeSmall: {
            width: 36,
            height: 36,
            minHeight: 36,
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: '8px 12px',
            gap: 8,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          sizeSmall: {
            height: 20,
            fontSize: '0.6875rem',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            fontSize: '0.8125rem',
            '&.MuiInputBase-sizeSmall': {
              minHeight: 26,
            },
          },
          input: {
            padding: '6px 10px',
          },
          inputSizeSmall: {
            padding: '2px 8px',
          },
          multiline: {
            padding: 0,
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          size: 'small',
        },
        styleOverrides: {
          root: {
            fontSize: '0.8125rem',
          },
          select: {
            display: 'flex',
            alignItems: 'center',
            minHeight: 26,
            paddingTop: '2px',
            paddingBottom: '2px',
            paddingLeft: '8px',
            paddingRight: '22px !important',
            boxSizing: 'border-box',
            lineHeight: 1.35,
          },
          icon: {
            fontSize: '1.125rem',
            right: 4,
          },
        },
      },
      MuiNativeSelect: {
        styleOverrides: {
          select: {
            fontSize: '0.8125rem',
            paddingTop: 3,
            paddingBottom: 3,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: '0.8125rem',
            minHeight: 30,
            py: 0.5,
          },
        },
      },
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

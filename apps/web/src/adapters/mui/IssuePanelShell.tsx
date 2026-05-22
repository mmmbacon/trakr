import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

export interface IssuePanelShellProps {
  loading?: boolean;
  failed?: boolean;
  onClose: () => void;
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

export default function IssuePanelShell({
  loading = false,
  failed = false,
  onClose,
  header,
  footer,
  children,
}: IssuePanelShellProps) {
  const theme = useTheme();

  return (
    <>
      <Box
        aria-hidden="true"
        onClick={onClose}
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1199,
          display: { xs: 'block', md: 'none' },
          bgcolor: alpha(theme.palette.common.black, 0.45),
        }}
      />
      <Box
        component="aside"
        aria-label="Issue details"
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: { xs: '100%', md: 480 },
          maxWidth: '100%',
          zIndex: 1200,
          borderLeft: { md: 1 },
          borderColor: 'divider',
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          boxShadow: `-8px 0 24px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.45 : 0.08)}`,
        }}
      >
      {loading ? (
        <Box p={2}>
          <Typography variant="body2" color="text.secondary">
            Loading issue…
          </Typography>
        </Box>
      ) : null}

      {failed ? (
        <Box p={2}>
          <Typography variant="body2" color="error">
            Issue not found
          </Typography>
          <Button size="small" onClick={onClose} sx={{ mt: 1 }}>
            Back
          </Button>
        </Box>
      ) : null}

      {header}
      {children}
      {footer}
      </Box>
    </>
  );
}

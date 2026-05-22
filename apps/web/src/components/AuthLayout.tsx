import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';

interface AuthLayoutProps {
  loading?: boolean;
  children: ReactNode;
  contentWidth?: number;
}

export default function AuthLayout({
  loading = false,
  children,
  contentWidth = 340,
}: AuthLayoutProps) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
        }}
      >
        {loading && <LinearProgress />}
        <Box display="flex" justifyContent="center" mt={5}>
          <img src="/img/Logo2-lg.png" alt="logo" height="250px" />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          p={5}
          width={contentWidth}
        >
          {children}
        </Box>
      </Paper>
    </Box>
  );
}

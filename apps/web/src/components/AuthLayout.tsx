import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

interface AuthLayoutProps {
  loading?: boolean;
  children: ReactNode;
  maxWidth?: number;
}

export default function AuthLayout({
  loading = false,
  children,
  maxWidth = 400,
}: AuthLayoutProps) {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        py={4}
      >
        <Paper elevation={3} sx={{ width: '100%', maxWidth }}>
          {loading && <LinearProgress />}
          <Stack spacing={3} alignItems="center" p={4}>
            <Box
              component="img"
              src="/img/Logo2-lg.png"
              alt="trakr logo"
              sx={{ maxWidth: 200, width: '100%', height: 'auto' }}
            />
            <Stack spacing={2} width="100%">
              {children}
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}

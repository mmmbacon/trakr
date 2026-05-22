import type { ReactNode } from 'react';

import { Box, Paper, ProgressBar } from './ui';

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
  const contentClassName = contentWidth === 300
    ? 'auth-layout-content auth-layout-content--narrow'
    : 'auth-layout-content auth-layout-content--default';

  return (
    <Box className="auth-layout">
      <Paper className="auth-layout-paper">
        {loading && <ProgressBar />}
        <Box className="auth-layout-logo-wrap">
          <img src="/img/Logo2-lg.png" alt="logo" height="250px" />
        </Box>
        <Box className={contentClassName}>
          {children}
        </Box>
      </Paper>
    </Box>
  );
}

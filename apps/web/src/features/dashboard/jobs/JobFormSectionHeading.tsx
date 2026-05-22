import { Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface JobFormSectionHeadingProps {
  title: string;
  accessory?: ReactNode;
}

export default function JobFormSectionHeading({
  title,
  accessory,
}: JobFormSectionHeadingProps) {
  return (
    <Typography variant="h6" gutterBottom>
      {title}
      {accessory}
    </Typography>
  );
}

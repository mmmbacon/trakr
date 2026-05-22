import { Typography } from '@mui/material';
import type { ReactNode } from 'react';

const headingSx = {
  fontFamily: 'Montserrat',
  pt: 1.875,
  pb: 0,
  lineHeight: '1em',
  mt: 0,
  mb: 0.625,
};

interface JobFormSectionHeadingProps {
  title: string;
  accessory?: ReactNode;
}

export default function JobFormSectionHeading({
  title,
  accessory,
}: JobFormSectionHeadingProps) {
  return (
    <Typography
      variant="h5"
      className="heading"
      sx={headingSx}
    >
      {title}
      {accessory}
    </Typography>
  );
}

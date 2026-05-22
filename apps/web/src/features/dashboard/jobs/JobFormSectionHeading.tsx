import type { ReactNode } from 'react';

import { Typography } from '../../../components/ui';

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
      className="heading job-form-section-heading"
    >
      {title}
      {accessory}
    </Typography>
  );
}

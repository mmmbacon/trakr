import LinearProgress from '@mui/material/LinearProgress';

import type { LinearProgressProps } from '../../components/ui/types';

export default function ProgressBar({ className }: LinearProgressProps) {
  return <LinearProgress className={className} />;
}

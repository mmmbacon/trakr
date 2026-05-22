import Grow from '@mui/material/Grow';

import type { GrowProps } from '../../components/ui/types';

export default function GrowTransition({ in: inProp, children, timeout = 500 }: GrowProps) {
  return (
    <Grow in={inProp} timeout={timeout}>
      <span>{children}</span>
    </Grow>
  );
}

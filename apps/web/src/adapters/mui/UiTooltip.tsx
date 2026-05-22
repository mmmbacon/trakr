import MuiTooltip from '@mui/material/Tooltip';

import type { TooltipProps } from '../../components/ui/types';
import { lightTooltipSlotProps } from './tooltipStyles';

export default function Tooltip({
  title,
  children,
  placement = 'right',
  className,
}: TooltipProps) {
  return (
    <MuiTooltip
      title={title}
      aria-label={title}
      placement={placement}
      className={className}
      slotProps={lightTooltipSlotProps}
    >
      <span>{children}</span>
    </MuiTooltip>
  );
}

import { PieChart } from '@mui/x-charts/PieChart';

import type { StatusPieChartProps } from '../../components/ui/types';

export default function StatusPieChart({
  data,
  colors,
  height = 320,
  ariaLabel,
}: StatusPieChartProps) {
  return (
    <PieChart
      height={height}
      colors={[...colors]}
      aria-label={ariaLabel}
      series={[
        {
          data,
          innerRadius: '60%',
        },
      ]}
    />
  );
}

import { BarChart } from '@mui/x-charts/BarChart';

import { colors } from '../../tokens';
import type { SalaryBarChartProps } from '../../components/ui/types';

export default function SalaryBarChart({
  data,
  color = colors.primary,
  height = 380,
  ariaLabel = 'Salary overview bar chart',
}: SalaryBarChartProps) {
  return (
    <BarChart
      height={height}
      margin={{ bottom: 80 }}
      aria-label={ariaLabel}
      xAxis={[{
        scaleType: 'band',
        data: data.map((item) => item.label),
        tickLabelStyle: {
          angle: -35,
          textAnchor: 'end',
          fontSize: 11,
        },
      }]}
      series={[{
        data: data.map((item) => item.value),
        color,
        label: 'Jobs',
      }]}
    />
  );
}

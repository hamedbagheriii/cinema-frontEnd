import React, { FC } from 'react';
import { ChartConfig, ChartTooltip } from './ui/chart';
import { ChartTooltipContent } from './ui/chart';
import { CartesianGrid, Line, XAxis } from 'recharts';
import { ChartContainer } from './ui/chart';
import { LineChart } from 'recharts';

interface chartProps {
  chartConfig: ChartConfig;
  chartData: any[];
}
const ChartComo: FC<chartProps> = ({ chartConfig, chartData }) => {
  return (
    <ChartContainer
      config={chartConfig}
      className='min-h-[200px] bg-red-700 shadow-md shadow-red-900  p-3 rounded-xl w-full max-w-[650px] mx-auto'
    >
      <LineChart accessibilityLayer data={chartData} className='mx-auto'>
        <CartesianGrid vertical={false} />
        <XAxis dataKey='month.title'  tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent className='bg-white/50 ' />}
          labelClassName='text-white'
        />
        <Line
          dataKey='income'
          fill='#000'
          type='bump'
          stroke='#fff'
          strokeWidth={3}
          dot={true}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default ChartComo;

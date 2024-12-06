import ChartComo from '@/components/chartComo';
import Layout from '@/components/layout/dashboard/admin/layout';
import {
  ChartConfig,
} from '@/components/ui/chart';
import { useToken } from '@/hooks/use-Token';
import { getIncomeService } from '@/services/dashboard/dashboard';
import Card from '@/utils/card';
import React, { useEffect, useState } from 'react';
import jMoment from 'moment';
const Index = () => {
  const { isUser } = useToken();
  const [cardData, setCardData] = useState<any>({});
  const [charDataArr, setCharDataArr] = useState<any[]>([]);
  const [chartData, setCharData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ! handle get income for cards =>
  const handleGetIncome = async () => {
    const res = await getIncomeService();

    if (res.data.success === true) {
      setCardData(res.data);
      setCharDataArr(res.data.chart);
      setIsLoading(false);
    }
  };

  const handleSetChartData = () => {

    setCharData(charDataArr);
  };

  useEffect(() => {
    handleGetIncome();
  }, []);

  useEffect(() => {
    handleSetChartData();
  }, [charDataArr]);

  const chartConfig = {
    income: {
      label: 'درآمد',
    },
  } satisfies ChartConfig;

  return (
    <Layout>
      {isLoading ? (
        <div>isLoading</div>
      ) : (
        <div className='border shadow-lg rounded-2xl px-2 py-5'>
          {/* cards */}
          <div
            className='w-full flex flex-col md:flex-row gap-y-4 md:gap-y-0 justify-center items-center
              sm:justify-around '
          >
            <Card
              todayC={cardData.income.todayIncome}
              monthC={cardData.income.monthlyIncome}
              yearC={cardData.income.yearlyIncome}
              icon='cash-stack'
              title='درآمد'
              dec='جمع مبالغ پرداختی (تومان)'
            />
            <Card
              todayC={cardData.tickets.today}
              monthC={cardData.tickets.month}
              yearC={cardData.tickets.year}
              icon='ticket-perforated'
              title='بلیط های'
              dec='جمع بلیط های پرداختی '
            />
          </div>

          {/* chart */}
          <div className='w-full flex flex-col justify-center items-center mt-10 '>
            <span className='mx-auto mb-2 px-4 py-2 rounded-full text-white bg-red-700'>
              نمودار فروش یک سال گذشته :
            </span>
            {chartData.length > 1 && (
              <ChartComo chartConfig={chartConfig} chartData={chartData} />
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;

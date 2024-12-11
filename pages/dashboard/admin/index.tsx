import ChartComo from '@/components/chartComo';
import Layout from '@/components/layout/dashboard/admin/layout';
import { ChartConfig } from '@/components/ui/chart';
import { getIncomeService } from '@/services/dashboard/dashboard';
import Card from '@/utils/card';
import React, { useEffect, useState } from 'react';
import LoadingData from '@/utils/loadingData';
import { handleShowAlert } from '@/components/AlertCompo';
import { useToast } from '@/hooks/use-toast';
const Index = () => {
  const [cardData, setCardData] = useState<any>({});
  const [charDataArr, setCharDataArr] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // ! handle get income for cards =>
  const handleGetIncome = async () => {
    try {
      const res = await getIncomeService();
      if (res.data.success === true) {
        setCardData(res.data);
        setCharDataArr(res.data.chart);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } else {
        handleShowAlert(res.response.data.message || res.message, false, 'error', toast);
      }
    } catch (error : any) {
      handleShowAlert(
        error.response.data.message || error.message,
        false,
        'error',
        toast
      );
    }
  };

  useEffect(() => {
    handleGetIncome();
  }, []);

  const chartConfig = {
    income: {
      label: 'درآمد',
    },
  } satisfies ChartConfig;

  return (
    <Layout>
      {isLoading ? (
        <LoadingData />
      ) : (
        <div className='border shadow-lg rounded-2xl px-2 py-5 md:pb-6'>
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
          <div className='w-full flex flex-col justify-center items-center mt-14'>
            <span
              className='mx-auto mb-4 px-4 py-2 rounded-full text-white shadow-md
             shadow-red-900 bg-red-700'
            >
              نمودار فروش یک سال گذشته :
            </span>
            {charDataArr.length > 1 && (
              <ChartComo chartConfig={chartConfig} chartData={charDataArr} />
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;

import Layout from '@/components/layout/dashboard/admin/layout';
import { useToken } from '@/hooks/use-Token';
import { getIncomeService } from '@/services/dashboard/dashboard';
import Card from '@/utils/card';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const { isUser } = useToken();
  const [cardData, setCardData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleGetIncome = async () => {
    const res = await getIncomeService();

    if (res.data.success === true) {
      setCardData(res.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetIncome();
  }, []);

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
          <div className='w-full flex flex-col justify-center items-center mt-10 bg-slate-200'>
            
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;

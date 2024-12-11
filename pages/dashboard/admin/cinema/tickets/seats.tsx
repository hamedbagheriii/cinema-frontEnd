import AddHeaderCompo from '@/components/addHeaderCompo';
import { Button } from '@/components/ui/button';
import LoadingData from '@/utils/loadingData';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Seats = () => {
  const [rows, setRows] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { data } = router.query;

  const handleGetData = async () => {
    setIsLoading(true);
    const dataP = await JSON.parse(router.query.data as string);

    setRows(dataP);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (data) {
      handleGetData();
    }
  }, [data]);

  return isLoading ? (
    <div className='w-full h-full mt-10 px-4'>
      <LoadingData />
    </div>
  ) : (
    <AddHeaderCompo title='مشاهده صندلی ها' icon='ui-checks-grid'>
      <div className='w-full flex flex-col justify-center items-center'>
        <span className='text-[14px] text-wrap mb-4 px-4 w-full text-center'>
          {`صندلی های رزرو شده بلیط`}
          <span className='mx-1 text-red-700'>{rows.ticket}</span>
          {'به شرح زیر است :'}
        </span>
        <div
          className='w-full items-center justify-center h-full flex flex-row
         flex-wrap  gap-2'
        >
          {rows.rows.map((t: any) => (
            <div
              className='flex gap-2 h-[36px] max-w-[140px] min-w-[130px] px-2 
            text-[10px] items-center rounded-md text-nowrap
            bg-white border-2 border-black text-red-700 justify-between'
              key={`${t.row}-${t.selectedSeats}-${t.id}`}
            >
              <div className='flex flex-row w-full justify-around'>
                <span>ردیف : {t.row} </span>
                <span> صندلی {t.selectedSeats} </span>
              </div>
            </div>
          ))}
        </div>
        <hr className='w-11/12 bg-red-700 h-1.5 my-6 rounded-full' />
        <div className='w-full flex px-4 flex-row justify-end items-center'>
          <Button
            className='bg-gray-700  hover:bg-slate-900'
            onClick={() => router.back()}
          >
            بازگشت
          </Button>
        </div>
      </div>
    </AddHeaderCompo>
  );
};

export default Seats;

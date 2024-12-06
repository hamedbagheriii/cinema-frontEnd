import Layout from '@/components/layout/dashboard/admin/layout';
import PaginationTable from '@/components/table/tableData';
import { getCinemasService } from '@/services/dashboard/cinema/cinema';
import ChipsData from '@/utils/chipsData';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [cinemas, setCinemas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ! handle get cinemas =>
  const handleGetCinemas = async () => {
    const res = await getCinemasService();

    if (res.data.success === true) {
      setCinemas(res.data.data);
      console.log(res.data.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    handleGetCinemas();
  }, []);

  const dataInfo = [
    { field: 'id', title: 'آیدی' },
    { field: 'cinemaName', title: 'نام' },
    {
      field: null,
      title: 'آدرس',
      element: (row: any) => {
        return <span className='text-red-700'>{`${row.province} , ${row.city} | ${row.address}`}</span>;
      },
    },
    {
        field: null,
        title: 'سالن',
        element: (row: any) => {
          return <ChipsData data={row.halls} />;
        },
      },
  ];
  return (
    <Layout>
      <div className='border shadow-lg rounded-2xl flex flex-col px-2 py-5 md:pb-6'>
        <span className='mx-auto text-[22px] text-red-700 border-[3px] px-6 py-1 rounded-full border-black'>
          مدیریت سینما ها
        </span>
        <hr className='w-11/12 my-10 mx-auto bg-red-700  pt-1 rounded-full' />
        <div className='w-full flex flex-col  '>
          <PaginationTable
            data={cinemas}
            dataInfo={dataInfo}
            numOfPage={10}
            isLoading={isLoading}
            searchField='id'
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;

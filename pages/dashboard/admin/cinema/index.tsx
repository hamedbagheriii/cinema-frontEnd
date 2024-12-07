import { handleShowAlert } from '@/components/AlertCompo';
import Layout from '@/components/layout/dashboard/admin/layout';
import PaginationTable from '@/components/table/tableData';
import { useToast } from '@/hooks/use-toast';
import {
  deleteCinemaService,
  getCinemasService,
} from '@/services/dashboard/cinema/cinema';
import Action from '@/utils/action';
import ChipsData from '@/utils/chipsData';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [cinemas, setCinemas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // ! handle get cinemas =>
  const handleGetCinemas = async () => {
    setIsLoading(true);
    const res = await getCinemasService();

    if (res.data.success === true) {
      setCinemas(res.data.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleDeteleData = async (rowData: any) => {
    const res = await deleteCinemaService(rowData.id);
    if (res.data?.success === true) {
      handleShowAlert(
        `سینما با آیدی ${rowData.id} با موفقیت حذف شد . `,
        true,
        'success',
        toast
      );

      setTimeout(() => {
        handleGetCinemas();
      }, 2000);
    }
    else{
      handleShowAlert(
        'عملیات با خطا مواجه شد ! ',
        false,
        'error',
        toast
      );
    }
  };

  const handleEditData = (rowData: any) => {
    
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
        return <span>{`${row.province} , ${row.city} | ${row.address}`}</span>;
      },
    },
    {
      field: null,
      title: 'سالن ها',
      element: (row: any) => {
        return <ChipsData target='hallName' data={row.halls} />;
      },
    },
    {
      field: null,
      title: 'عملیات',
      element: (row: any) => {
        return (
          <Action
            handleDeteleData={handleDeteleData}
            handleEditData={handleEditData}
            target='سینما'
            rowData={row}
          />
        );
      },
    },
  ];

  return (
    <Layout>
      <div className='border shadow-lg rounded-2xl flex  flex-col px-4 py-5 md:pb-6 '>
        <span className='mx-auto text-[22px] text-red-700 border-[3px] px-6 py-1 rounded-full border-black'>
          مدیریت سینما ها
        </span>
        <hr className='w-11/12 my-10 mx-auto bg-red-700  pt-1 rounded-full' />
        <div>
          <PaginationTable
            data={cinemas}
            dataInfo={dataInfo}
            numOfPage={10}
            isLoading={isLoading}
            searchField={{ target: 'cinemaName', value: 'نام سینما را جستجو کنید . . .' }}
            addItem='cinema/add'
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;

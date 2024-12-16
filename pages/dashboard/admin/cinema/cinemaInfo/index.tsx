import { handleShowAlert } from '@/components/AlertCompo';
import TableLayout from '@/components/layout/dashboard/admin/tableLayout';
import PaginationTable from '@/components/table/tableData';
import { useToast } from '@/hooks/use-toast';
import {
  deleteCinemaService,
  getCinemasService,
} from '@/services/dashboard/cinema/cinema';
import Action from '@/utils/action';
import ChipsData from '@/utils/chipsData';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [cinemas, setCinemas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const router = useRouter();


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
        `سینما با آیدی ${rowData.id} ( ${rowData.cinemaName} ) با موفقیت حذف شد . `,
        true,
        'success',
        toast
      );

      setTimeout(() => {
        handleGetCinemas();
      }, 1000);
    } else {
      handleShowAlert('عملیات با خطا مواجه شد ! ', false, 'error', toast);
    }
  };

  const handleEditData = (rowData: any) => {
    router.push({
      pathname: 'cinemaInfo/action/edit',
      query: {
        data: JSON.stringify({
          id: rowData.id,
          cinemaName: rowData.cinemaName,
          province: rowData.province,
          city: rowData.city,
          address: rowData.address,
          addImage : false
        }),
      },
    });
  };
  

  useEffect(() => {
    handleGetCinemas();
  }, []);

  // ! handle dataInfo =>
  const AdditionData = [
    {
      title: 'سالن ها',
      color: 'text-blue-800',
      icon: 'door-open',
      function: (rowData: any) => {
        router.push({
          pathname: 'cinemaInfo/hall/',
          query: {
            data: JSON.stringify({
              id: rowData.id,
              cinemaName: rowData.cinemaName,
              halls: rowData.halls,
            }),
          },
        });
      },
    },
    {
      title: 'فیلم ها',
      color: 'text-purple-500',
      icon: 'film',
      function: (rowData: any) => {
        router.push({
          pathname: 'cinemaInfo/movies/',
          query: {
            data: JSON.stringify({
              id: rowData.id,
              cinemaName: rowData.cinemaName,
              movies: rowData.movies,
            }),
          },
        });
      },
    },
  ];
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
        return row.halls.length > 0 ? (
          <ChipsData target='hallName' data={row.halls} />
        ) : (
          <hr className='w-2/12 h-1 rounded-full mx-auto  bg-red-700' />
        );
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
            AdditionData={AdditionData}
          />
        );
      },
    },
  ];

  return (
    <TableLayout title='مدیریت سینما ها' icon='camera-reels'>
      <div>
        <PaginationTable
          data={cinemas}
          dataInfo={dataInfo}
          numOfPage={10}
          isLoading={isLoading}
          searchField={{ target: 'cinemaName', value: 'نام سینما را جستجو کنید . . .' }}
          addItem='cinemaInfo/action/add'
        />
      </div>
    </TableLayout>
  );
};

export default Index;

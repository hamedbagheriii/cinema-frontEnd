import { handleShowAlert } from '@/components/AlertCompo';
import TableLayout from '@/components/layout/dashboard/admin/tableLayout';
import PaginationTable from '@/components/table/tableData';
import { useToast } from '@/hooks/use-toast';
import { deleteMovieService, getMovieService } from '@/services/dashboard/movie/movie';
import Action from '@/utils/action';
import { numberWithCommas } from '@/utils/numWCommas';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const router = useRouter();

  // ! handle get Movies =>
  const handleGetMovies = async () => {
    setIsLoading(true);
    const res = await getMovieService();

    if (res.data.success === true) {
      setMovies(res.data.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  // ! handle delete data =>
  const handleDeteleData = async (rowData: any) => {
    const res = await deleteMovieService(rowData.id);
    if (res.data?.success === true) {
      handleShowAlert(
        `فیلم با آیدی ${rowData.id} ( ${rowData.movieName} ) با موفقیت حذف شد . `,
        true,
        'success',
        toast
      );

      setTimeout(() => {
        handleGetMovies();
      }, 1000);
    } else {
      handleShowAlert('عملیات با خطا مواجه شد ! ', false, 'error', toast);
    }
  };

  // ! handle edit data =>
  const handleEditData = (rowData: any) => {
    router.push({
      pathname: 'movies/edit',
      query: {
        data: JSON.stringify({
          id: rowData.id,
          movieName: rowData.cinemaName,
          province: rowData.province,
          city: rowData.city,
          address: rowData.address,
          image: rowData.image,
        }),
      },
    });
  };

  useEffect(() => {
    handleGetMovies();
  }, []);

  // ! handle dataInfo =>
  const dataInfo = [
    { field: 'id', title: 'آیدی' },
    { field: 'movieName', title: 'نام' },
    { field: 'decription', title: 'توضیحات' },
    { field: 'time', title: 'زمان' },
    {
      field: null,
      title: 'قیمت',
      element: (row: any) => <>{numberWithCommas(row.price)} تومان</>,
    },
    { field: 'createdAt', title: 'سال انتشار' },
    {
      field: null,
      title: 'عکس',
      element: (row: any) => {
        return (
          <Image
            src={row.image[0].url}
            alt={row.movieName}
            width={1}
            height={1}
            className='rounded-xl w-[90px] mx-auto '
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            loading='lazy'
            placeholder='empty'
          />
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
            target='فیلم'
            rowData={row}
          />
        );
      },
    },
  ];

  return (
    <TableLayout title='مدیریت فیلم ها' icon='film'>
      <div>
        <PaginationTable
          data={movies}
          dataInfo={dataInfo}
          numOfPage={10}
          isLoading={isLoading}
          searchField={{ target: 'movieName', value: 'نام فیلم را جستجو کنید . . .' }}
          addItem='movies/add'
        />
      </div>
    </TableLayout>
  );
};

export default Index;

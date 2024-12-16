import { TokenData } from '@/atoms/atoms';
import { handleShowAlert } from '@/components/AlertCompo';
import TableLayout from '@/components/layout/dashboard/admin/tableLayout';
import PaginationTable from '@/components/table/tableData';
import { useToast } from '@/hooks/use-toast';
import { deleteMovieService, getMovieService } from '@/services/dashboard/movie/movie';
import Action from '@/utils/action';
import { hasAccess } from '@/utils/hasAccess';
import LoadingData from '@/utils/loadingData';
import { numberWithCommas } from '@/utils/numWCommas';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const router = useRouter();
  const [isUser] = useAtom(TokenData);

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
          movieName: rowData.movieName,
          decription: rowData.decription,
          time: rowData.time,
          price: rowData.price,
          createdAt: rowData.createdAt,
          isShow: rowData.isShow,
          addImage: false,
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
      title: 'نمایش فیلم',
      element: (row: any) => {
        return (
          <span className={`${row.isShow ? 'text-green-600' : 'text-red-500'}`}>
            {row.isShow ? 'در حال نمایش' : 'مخفی شده'}
          </span>
        );
      },
    },
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
            handleDeteleData={
              hasAccess('delete-movie', isUser.roles) ? handleDeteleData : null
            }
            handleEditData={hasAccess('edit-movie', isUser.roles) ? handleEditData : null}
            target='فیلم'
            rowData={row}
          />
        );
      },
    },
  ];

  return isLoading ? (
    <div dir='rtl' className='w-11/12 mx-auto mt-10'>
      <LoadingData />
    </div>
  ) : (
    <TableLayout title='مدیریت فیلم ها' icon='film'>
      <div>
        <PaginationTable
          data={movies}
          dataInfo={dataInfo}
          numOfPage={10}
          isLoading={isLoading}
          searchField={{ target: 'movieName', value: 'نام فیلم را جستجو کنید . . .' }}
          addItem={hasAccess('add-movie', isUser.roles) ? 'movies/add' : null}
        />
      </div>
    </TableLayout>
  );
};

export default Index;

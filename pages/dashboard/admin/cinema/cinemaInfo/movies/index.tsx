import AddHeaderCompo from '@/components/addHeaderCompo';
import { handleShowAlert } from '@/components/AlertCompo';
import FormikControl from '@/components/formik/formikControl';
import SubmitCompo from '@/components/submitCompo';
import PaginationTable from '@/components/table/tableData';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  addHallService,
  addMovieCinemaService,
  deleteHallService,
  editHallService,
} from '@/services/dashboard/cinema/cinema';
import { getMovieService } from '@/services/movie/movie';
import Action from '@/utils/action';
import LoadingData from '@/utils/loadingData';
import { Form, Formik } from 'formik';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

const HallPath = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data } = router.query as any;
  const [movies, setMovies] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reqLoading, setReqLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any[]>([]);

  // ! handle set and get data =>
  const handleSetData = async () => {
    const dataParse = await JSON.parse(data);
    const prevMovies = dataParse.movies.map((t: any) => t.movieId);
    setSelectedItem(prevMovies);

    // ! get movies =>
    const res = await getMovieService();
    console.log(res);
    
    if (res.data.success === true) {
      setMovies(res.data.data);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  // ! check cinema movies =>
  const handleCheckCinema = (id: number): boolean => {
    return selectedItem.includes(id);
  };

  // ! add or remove item =>
  const handleAddItem = (id: number) => {
    if (selectedItem.includes(id)) {
      let data = selectedItem.filter((t) => t !== id);

      setSelectedItem(data);
    } else {
      setSelectedItem((prev) => [...prev, id]);
    }
  };

  // ! handle send req =>
  const handleSendReq = async () => {
    setReqLoading(true);
    try {
      const res = await addMovieCinemaService(
        { movies: selectedItem },
        JSON.parse(data).id
      );

      if (res.data.success === true) {
        handleShowAlert(`فیلم ها با موفقیت ویرایش شد . `, true, 'success', toast);

        setTimeout(() => {
          router.back();
        }, 2500);
      } else {
        handleShowAlert(res.response.data.message || res.message, false, 'error', toast);
      }
    } catch (error: any) {
      handleShowAlert(
        error.respons?.data?.message || error.message,
        false,
        'error',
        toast
      );
    } finally {
      setTimeout(() => {
        setReqLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (data) {
      handleSetData();
    }
  }, [data]);

  return isLoading ? (
    <div dir='rtl' className='w-11/12 mx-auto mt-10'>
      <LoadingData />
    </div>
  ) : (
    <AddHeaderCompo
      className='max-w-[1000px]'
      dec={`سینما : ${JSON.parse(data).cinemaName}`}
      title='فیلم ها'
      icon='film'
    >
      <div className='w-full flex flex-col items-center justify-center'>
        {/* send req */}
        <div className='w-full px-14 lg:flex-row  flex flex-col gap-3 mb-6'>
          <span className='w-ful mx-auto lg:w-6/12  flex justify-start items-center'>
            تعداد فیلم های انتخاب شده :{' '}
            <p className='text-red-700 mx-2 text-[17px] mt-0.5'>{selectedItem.length}</p>
          </span>
          <div
            className='w-full lg:w-6/12 items-center flex
           flex-col lg:flex-row gap-y-3 justify-end'
          >
            <Button
              onClick={() => router.back()}
              className='w-full md:w-10/12  mx-auto lg:w-5/12 
            bg-gray-600 hover:bg-gray-800'
            >
              بازگشت
            </Button>
            <Button
              onClick={() => handleSendReq()}
              className='w-full md:w-10/12  mx-auto lg:w-5/12 
            bg-red-700 hover:bg-red-800'
              disabled={selectedItem.length === 0 || reqLoading}
            >
              {reqLoading ? (
                <Loader2 className='size-5 animate-spin' />
              ) : (
                <>ویرایش فیلم ها</>
              )}
            </Button>
          </div>
        </div>

        {/* show movies */}
        <div className='w-full mx-auto flex flex-wrap gap-2 gap-y-6 justify-evenly items-center'>
          {movies.map((movie: any) => (
            <div
              key={movie.id}
              className='w-[350px]  bg-gray-200  px-5 py-4 rounded-md md:w-1/3 lg:w-1/4 
              min-h-[200px] text-center flex flex-col gap-2  '
            >
              <div className='w-full h-full relative'>
                <div
                  className='w-full h-full absolute bg-transparent
                hover:bg-black/20 transition-all cursor-pointer duration-150 rounded-xl'
                ></div>
                <Image
                  src={movie.image[0].url}
                  alt={movie.movieName}
                  width={1}
                  height={1}
                  className='rounded-xl w-full min-h-[220px] md:h-[300px] cursor-pointer'
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  loading='lazy'
                  placeholder='empty'
                />
              </div>
              <span className='mt-2'>{movie.movieName}</span>
              <Button
                onClick={() => handleAddItem(movie.id)}
                className={`${
                  handleCheckCinema(movie.id)
                    ? 'bg-green-600 hover:bg-green-800'
                    : 'bg-red-800 hover:bg-red-900'
                }`}
              >
                {handleCheckCinema(movie.id) ? 'انتخاب شده !' : 'افزودن'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </AddHeaderCompo>
  );
};

export default HallPath;

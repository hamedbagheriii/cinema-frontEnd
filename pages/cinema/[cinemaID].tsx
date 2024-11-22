import { Button } from '@/components/ui/button';
import CinemaDec from '@/utils/cinemaDec';
import { convertDate } from '@/utils/convertDate';
import MovieDec from '@/utils/movieDec';
import { numberWithCommas } from '@/utils/numbWithCommas';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC, use, useEffect, useState } from 'react';

interface cinemaProps {
  cinemaData: any;
}
const Cinema: FC<cinemaProps> = ({ cinemaData }) => {
  const router = useRouter();
  const [dates, setDates] = useState<string[]>([]);
  const [date, setDate] = useState<string>('');
  const [movies, setMovies] = useState<any[]>([]);
  const times : string[] = [
    '09:00',
    '12:00',
    '15:00',
    '18:00',
    '21:00',
    '23:00',
  ]

  // !  get dates
  const dateTime: Date = new Date();
  const handleGetDate = () => {
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();
    let dates: string[] = [];

    for (let i = 0; i <= 2; i++) {
      dates.push(`${year}-${month}-${day + i}`);
    }

    setDate(dates[0]);
    setDates(dates);
  };

  // ! get movies
  const handleSetMovies = () => {
    let allMovies: any[] = [];

    cinemaData.movies.map((movie: any) => {
      allMovies.push(false);
    });

    setMovies(allMovies);
  };

  // ! handle set selected movie
  const handleSetSelect = (movie: number) => {
    const newMovies = [...movies];
    newMovies[movie] = !movies[movie];

    setMovies(newMovies);
  };

  // ! handle show selected movie
  const handleShowSelect = (movie: number) => {
    return movies[movie];
  };

  useEffect(() => {
    handleGetDate();
    handleSetMovies();
  }, [cinemaData]);

  return (
    <div dir='rtl' className='w-full pt-8 flex flex-col justify-center items-center'>
      <div
        className={`w-full h-full sm:h-[280px] shadow-sm
        shadow-gray-900 cinemaBG sm:px-8 flex flex-col sm:flex-row justify-center items-center`}
      >
        {/* image and mobile display */}
        <div className='w-full sm:w-6/12 md:4/12 h-full relative flex justify-end  items-center'>
          <Image
            src={cinemaData.image[0].url}
            alt={cinemaData.cinemaName}
            width={1}
            height={1}
            className='rounded-xl w-full h-full sm:max-w-[400px] sm:h-4/5 '
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            loading='lazy'
            placeholder='empty'
          />
          <div
            className='from-black/75 to-black/30 text-white
           bg-gradient-to-t flex-col text-center bottom-0  pb-5 pt-3
           mx-auto w-full absolute flex sm:hidden'
          >
            <CinemaDec cinemaData={cinemaData} className=' mt-4 mx-auto' />
          </div>
        </div>

        {/* md display */}
        <div
          className='w-full hidden sm:flex sm:w-6/12 md:8/12 h-full
         text-white flex-col justify-center items-start pr-10'
        >
          <CinemaDec cinemaData={cinemaData} />
        </div>
      </div>

      {/* date */}
      <div className='w-full max-w-[800px] flex px-4 flex-col gpa-2 mt-6'>
        <span className='text-[20px] flex'>
          برنامه اکران های سینما <i className='bi bi-caret-left-fill mt-0.5 ms-1'></i>
        </span>
        <div className='gap-4 flex mt-4'>
          {dates.map((d: string) => (
            <span
              key={`day-${d}`}
              className={` text-white pt-1 text-[14px] cursor-pointer
              px-3 rounded-full ${d == date ? ' bg-black' : 'bg-red-600'}`}
              onClick={() => setDate(d)}
            >
              {convertDate(d)}
            </span>
          ))}
        </div>

        <div className='w-full flex mt-10'>
          {cinemaData.movies.map((t: any) => (
            <div key={t.id}>{t.movieName}</div>
          ))}
        </div>
      </div>

      {/* movies */}
      <div className='flex w-full max-w-[800px] flex-col gap-4 px-4'>
        {cinemaData.movies.map((movie: any) => {
          let movieIndex = cinemaData.movies.indexOf(movie);
          let movieData = movie.movie;

          return (
            <div key={movieData.id}
              className='w-full  flex-col  mx-auto flex min-h-[200px] bg-black/5 px-4 py-2 rounded-lg'
            >
              {/* movie data */}
              <div className='w-full flex '>
                {/* image */}
                <div className='w-1/5 min-w-[130px] h-full min-h-[200px]'>
                  <Image
                    src={movieData.image?.[0].url}
                    alt={movieData.movieName}
                    width={1}
                    height={1}
                    className='rounded-xl w-full h-full min-h-[220px] cursor-pointer'
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    loading='lazy'
                    placeholder='empty'
                  />
                </div>

                {/* info */}
                <div className='w-4/5 flex flex-col gap-2 px-6 py-2 pt-4'>
                  <span className='text-[20px]'>{movieData.movieName}</span>
                  <span className='font-normal flex'>
                    <i className='bi bi-info-circle-fill text-red-700 me-2 mt-0.5'></i>
                    {movieData.decription}
                  </span>
                  <div className='flex flex-row gap-5 mt-10 font-normal'>
                    <MovieDec title='زمان' icon='clock-fill' movieData={movieData} />

                    <MovieDec
                      title='تاریخ انتشار'
                      icon='calendar-event-fill'
                      movieData={movieData}
                    />
                  </div>

                  {/* button Sans */}
                  <div className='w-full flex mt-auto'>
                    <span
                      className='flex gap-2 text-red-700 cursor-pointer
                    bg-red-200
                     hover:bg-red-300 transition-all duration-150 pt-1 pb-0.5 
                     justify-center items-center px-6 text-[15px] rounded-full'
                      onClick={() => handleSetSelect(movieIndex)}
                    >
                      <i className='bi bi-arrow-down'></i>
                      سانس ها
                    </span>
                  </div>
                </div>
              </div>

              {/* show Sans */}
              <div
                className={` mt-5 ${handleShowSelect(movieIndex) ? 'flex' : 'hidden'} 
               transition-all w-full flex-col gap-4 duration-300 py-2`}
              >
                <span className='text-[14px] cursor-pointer px-2 flex'
                  onClick={()=>router.push(`/movie/${movieData.id}`)}
                >
                  <i className='bi bi-arrow-left-square-fill mt-0.5
                  text-[14px] text-red-700 me-2'></i>
                  درباره فیلم {movieData.movieName}{' '}
                </span>

                <hr className='w-full my-1 bg-red-700/70 pt-1 rounded-full'/>

                {cinemaData.halls.map((t: any) => (
                  <div className='w-full min-h-[100px] px-2 py-2'>
                    <span className='text-[14px] text-gray-500'>سالن {t.hallName} :</span>

                    <div className='flex w-full gap-y-4 mt-3 flex-wrap'>
                      {times.map((time: string) => (
                        <div className='w-full sm:w-1/2 md:w-1/3   px-2 min-h-[40px]  rounded-md'>
                          <div className='w-full h-full bg-white border-2 border-black px-4  rounded-md flex justify-between items-center'>
                            <div className='w-1/2 flex flex-col gap-1 py-2'>
                              <span className='text-black text-[16px] font-bold'>سانس {time}</span>
                              <span className='text-sm text-gray-600'>{numberWithCommas(movieData.price)} تومان</span>
                            </div>

                            <Button className='w-1/4 min-w-[90px] bg-red-700 hover:bg-red-900'>خرید</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cinema;

export const getServerSideProps = async ({ params }: { params: any }) => {
  const cinemaURL = process.env.NEXT_PUBLIC_CINEMA_URL as string;
  const cinemaData = await fetch(`${cinemaURL}/${params.cinemaID}`).then((res) =>
    res.json()
  );

  return {
    props: {
      cinemaData: cinemaData.data,
    },
  };
};

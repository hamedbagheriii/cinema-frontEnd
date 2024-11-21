import CinemaDec from '@/utils/cinemaDec';
import { convertDate } from '@/utils/convertDate';
import MovieDec from '@/utils/movieDec';
import Image from 'next/image';
import React, { FC, use, useEffect, useState } from 'react';

interface cinemaProps {
  cinemaData: any;
}
const Cinema: FC<cinemaProps> = ({ cinemaData }) => {
  const [dates, setDates] = useState<string[]>([]);
  const [date, setDate] = useState<string>('');
  const [movies, setMovies] = useState<any[]>([]);

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
  const handleShowSelect =  (movie : number)=>{
    return movies[movie];
  }

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
              className={`bg-red-600 text-white pt-1 text-[14px] cursor-pointer
              px-3 rounded-full ${d == date && 'bg-black'}`}
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
            <div
              key={movieData.id}
              className='w-full  flex-col  mx-auto flex min-h-[200px] bg-black/5 px-4 py-2 rounded-lg'
            >
              <div className='w-full flex '>
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

              <div
                className={` mt-5 ${handleShowSelect(movieIndex) ? 'flex' : 'hidden'} transition-all w-full bg-red-300 duration-300`}
              >
                s
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

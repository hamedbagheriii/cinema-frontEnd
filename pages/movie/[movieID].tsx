import { Button } from '@/components/ui/button';
import CinemaDec from '@/utils/cinemaDec';
import { convertDate } from '@/utils/convertDate';
import MovieDec from '@/utils/movieDec';
import { numberWithCommas } from '@/utils/numbWithCommas';
import SelectCompo from '@/utils/selectCompo';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC, use, useEffect, useState } from 'react';

interface movieProps {
  movieData: any;
}
const Movie: FC<movieProps> = ({ movieData }) => {
  const router = useRouter();
  const [dates, setDates] = useState<string[]>([]);
  const [cinemas, setCinemas] = useState<any[]>([]);
  const [city, setCity] = useState<number>(0);
  const [citys, setCitys] = useState<any[]>([]);
  const [date, setDate] = useState<string>('');
  const times: string[] = ['09:00', '12:00', '15:00', '18:00', '21:00', '23:00'];

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

  // ! get cinema
  const handleSetCinemas = () => {
    let allCinema: any[] = [];

    movieData.cinemaData.map((cinema: any) => {
      allCinema.push(false);
    });

    setCinemas(allCinema);
  };

  // ! handle set selected cinema
  const handleSetSelect = (cinema: number) => {
    const newCinema = [...cinemas];
    newCinema[cinema] = !cinemas[cinema];

    setCinemas(newCinema);
  };

  // ! handle show selected cinema
  const handleShowSelect = (movie: number) => {
    return cinemas[movie];
  };

  // ! handle set citys
  const handleSetCitys = () => {
    let allCitys: any[] = [];

    movieData.cinemaData.map((t: any, i: number) =>
      allCitys.push({
        id: i,
        cityName: t.cinema.city,
      })
    );

    setCitys(allCitys);
  };

  useEffect(() => {
    handleGetDate();
    handleSetCinemas();
    handleSetCitys();
  }, [movieData]);

  //! filter cinemas
  const cinemaFilter = movieData.cinemaData.filter((cinema: any) => {
    return cinema.cinema.city === citys[city]?.cityName;
  });

  return (
    <div dir='rtl' className='w-full pt-8 flex flex-col justify-center items-center'>
      {/* image and display */}
      <div
        className={`w-full h-full sm:h-[350px] shadow-sm
        shadow-gray-900 cinemaBG py-7 sm:py-0 sm:px-8 flex flex-col sm:flex-row justify-center items-center`}
      >
        <div className='w-[150px] sm:w-[200px] h-full relative flex justify-end  items-center'>
          <Image
            src={movieData.image[0].url}
            alt={movieData.movieName}
            width={1}
            height={1}
            className='rounded-xl w-full h-full sm:h-4/5 '
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            loading='lazy'
            placeholder='empty'
          />
        </div>

        <div
          className='w-full flex items-center sm:w-6/12 md:8/12 h-full
         text-white flex-col justify-center sm:items-start sm:pr-10'
        >
          <MovieDec movieData={movieData} moviePage={true} />
        </div>
      </div>

      {/* date */}
      <div className='w-full max-w-[800px] flex px-4 flex-col gpa-2 mt-6'>
        <div className='w-full flex flex-wrap gap-y-2 justify-between items-center'>
          <span className='text-[20px]  flex'>
            <span> سینما های درحال اکران </span>
            <i className='bi bi-caret-left-fill mt-0.5 ms-1'></i>
          </span>

          <SelectCompo
            data={citys}
            title={citys[city]?.cityName}
            onChange={(index: number) => setCity(index)}
            city={city}
          />
        </div>

        <span className='mt-5'>
          <i className='bi bi-calendar-event-fill text-red-700 me-2 mt-0.5'></i>
          تاریخ اکران :
        </span>
        <div className='gap-4 flex-wrap flex mt-4'>
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
          {movieData.cinemaData.map((t: any) => (
            <div key={t.id}>{t.cinemaName}</div>
          ))}
        </div>
      </div>

      {/* cinemas */}
      <div className='flex w-full pb-10 max-w-[800px] flex-col gap-4 px-4'>
        {cinemaFilter.map((cinema: any) => {
          let cinemaIndex = movieData.cinemaData.indexOf(cinema);
          let cinemaData = cinema.cinema;

          return (
            <div
              key={cinemaData.id}
              className='w-full  flex-col  mx-auto flex min-h-[200px] bg-black/5 px-4 py-2 rounded-lg'
            >
              {/* cinema data */}
              <div className='w-full flex justify-center flex-wrap'>
                {/* image */}
                <div className='w-1/5 min-w-[200px] h-full min-h-[200px]'>
                  <Image
                    src={cinemaData.image?.[0].url}
                    alt={cinemaData.cinemaName}
                    width={1}
                    height={1}
                    className='rounded-xl w-full mt-7 h-full min-w-[200px] min-h-[150px] cursor-pointer'
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    loading='lazy'
                    placeholder='empty'
                  />
                </div>

                {/* info */}
                <div className='w-3/5 min-w-[200px] flex mx-auto sm:mx-0 flex-col gap-2  px-6 py-2 pt-0 infoSection'>
                  <div className='flex flex-col mx-auto sm:mx-0 gap-y-2'>
                    <CinemaDec
                      cinemaData={cinemaData}
                      className='mt-2 text-[12.5px] gap-x-4 mx-auto sm:mx-0 text-red-700'
                      locClass=' text-red-700 '
                      titleClass=' text-[20px] mx-auto sm:mx-0'
                    />
                  </div>

                  {/* button Sans */}
                  <div className='w-full flex mt-auto sm:mx-0'>
                    <span
                      className='flex mx-auto sm:mx-0 gap-2 text-red-700 cursor-pointer
                    bg-red-200
                     hover:bg-red-300 transition-all duration-150 pt-1 pb-0.5 
                     justify-center items-center px-6 text-[15px] rounded-full'
                      onClick={() => handleSetSelect(cinemaIndex)}
                    >
                      <i className='bi bi-arrow-down'></i>
                      سانس ها
                    </span>
                  </div>
                </div>
              </div>

              {/* show Sans */}
              <div
                className={` mt-5 ${handleShowSelect(cinemaIndex) ? 'flex' : 'hidden'} 
               transition-all w-full flex-col gap-4 duration-300 py-2`}
              >
                <span
                  className='text-[14px] cursor-pointer px-2 flex'
                  onClick={() => router.push(`/cinema/${cinemaData.id}`)}
                >
                  <i
                    className='bi bi-arrow-left-square-fill mt-0.5
                  text-[14px] text-red-700 me-2'
                  ></i>
                  درباره سینما {cinemaData.cinemaName}{' '}
                </span>

                <hr className='w-full my-1 bg-red-700/70 pt-1 rounded-full' />

                {cinemaData.halls.map((t: any) => (
                  <div key={t.id} className='w-full min-h-[100px] px-2 py-2'>
                    <span className='text-[14px] text-gray-500'>سالن {t.hallName} :</span>

                    <div className='flex w-full gap-y-4 mt-3 flex-wrap'>
                      {times.map((time: string) => (
                        <div
                          key={time}
                          className='w-full sm:w-1/2 md:w-1/3   px-2 min-h-[40px]  rounded-md'
                        >
                          <div className='w-full h-full bg-white border-2 border-black px-4  rounded-md flex justify-between items-center'>
                            <div className='w-1/2 flex flex-col gap-1 py-2'>
                              <span className='text-black text-[16px] font-bold'>
                                سانس {time}
                              </span>
                              <span className='text-sm text-gray-600'>
                                {numberWithCommas(movieData.price)} تومان
                              </span>
                            </div>

                            <Button
                              className='w-1/4 min-w-[90px] bg-red-700 hover:bg-red-900'
                              onClick={() =>
                                router.push(
                                  `/event/${movieData.id}?cinema=${cinemaData.id}&hall=${t.id}&date=${date}&time=${time}`
                                )
                              }
                            >
                              خرید
                            </Button>
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

export default Movie;

export const getServerSideProps = async ({ params }: { params: any }) => {
  const movieURL = process.env.NEXT_PUBLIC_MOVIES_URL as string;
  const movieData = await fetch(`${movieURL}/${params.movieID}`).then((res) =>
    res.json()
  );
  console.log(params.movieID);

  return {
    props: {
      movieData: movieData.data,
    },
  };
};

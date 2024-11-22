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
  const [movies, setMovies] = useState<any[]>([]);
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

  // ! get movies
  const handleSetMovies = () => {
    let allMovies: any[] = [];

    movieData.movies.map((movie: any) => {
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

  // ! handle set citys
  const handleSetCitys = () => {
    let allCitys: any[] = [];

    movieData.cinemaData.map((t: any) =>
      allCitys.push({
        id: t.cinema.id,
        city: t.cinema.city,
      })
    );

    setCitys(allCitys);
    setCity(allCitys[0].id);
  };

  useEffect(() => {
    // handleGetDate();
    // handleSetMovies();
    handleSetCitys();
  }, [movieData]);

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
        <div className='w-full flex justify-between items-center'>
          <span className='text-[20px] flex'>
            سینما های درحال اکران <i className='bi bi-caret-left-fill mt-0.5 ms-1'></i>
          </span>

          <SelectCompo
            data={citys}
            title={citys[city]?.city}
            onChange={(id: number) => setCity(id)}
            city={city}
          />
        </div>

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
          {movieData.cinemaData.map((t: any) => (
            <div key={t.id}>{t.cinemaName}</div>
          ))}
        </div>
      </div>

      {/* movies */}
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

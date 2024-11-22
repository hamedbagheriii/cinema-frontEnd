import React, { FC } from 'react';

interface movieDec {
  movieData: any;
  title?: string;
  icon?: string;
  moviePage?: boolean;
}
const MovieDec: FC<movieDec> = ({ movieData, title, icon, moviePage = false }) => {
  return moviePage ? (
    <div className='flex flex-col w-full text-center sm:text-right gap-1 mt-3'>
      <span className='text-[24px] mb-2'>{movieData.movieName}</span>

      <span className='font-normal mx-auto sm:mx-0 text-wrap flex flex-col w-4/5'>
        <div className='flex items-center justify-center sm:justify-start'>
          <i className='bi bi-info-circle-fill text-red-600 me-1 mt-0.5'></i>
          داستان فیلم :
        </div>
        {movieData.decription}
      </span>

      <div className='flex w-full md:w-4/5 justify-between mt-2 sm:mt-10 items-center'>
        <span className='font-normal mx-auto text-wrap flex flex-col w-4/5'>
          <div className='flex items-center justify-center sm:justify-start'>
            <i className='bi bi-calendar-event-fill text-red-600 me-1.5 mt-0.5'></i>
            زمان انتشار :
          </div>
          {movieData.createdAt}
        </span>

        <span className='font-normal mx-auto text-wrap flex flex-col w-4/5'>
          <div className='flex items-center justify-center  sm:justify-start'>
            <i className='bi bi-clock-fill text-red-600 me-1.5 mt-0.5'></i>
            زمان فیلم :
          </div>
          {movieData.time}
        </span>
      </div>
    </div>
  ) : (
    <span className='flex flex-col text-center text-[13px]'>
      {movieData.createdAt}
      <div className='flex gap-1.5'>
        <i className={`bi bi-${icon} mt-0.5 text-red-700`}></i> {title}
      </div>
    </span>
  );
};

export default MovieDec;

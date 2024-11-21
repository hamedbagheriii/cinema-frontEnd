import React, { FC } from 'react';

interface movieDec {
  movieData: any;
  title: string;
  icon: string;
}
const MovieDec: FC<movieDec> = ({ movieData, title, icon }) => {
  return (
    <span className='flex flex-col text-center text-[13px]'>
      {movieData.createdAt}
      <div className='flex gap-1.5'>
        <i className={`bi bi-${icon} mt-0.5 text-red-700`}></i> {title}
      </div>
    </span>
  );
};

export default MovieDec;

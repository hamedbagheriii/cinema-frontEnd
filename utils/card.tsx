import React, { FC } from 'react';
import { numberWithCommas } from './numWCommas';

interface cardProps {
  icon: string;
  title: string;
  dec: string;
  todayC: number;
  monthC: number;
  yearC: number;
}
const Card: FC<cardProps> = ({ icon, title, dec, todayC, monthC, yearC }) => {
  return (
    <div
      className='w-full px-1 md:max-w-[360px] md:w-6/12  text-white rounded-xl  flex 
        flex-col justify-center items-center gap-y-4 '
    >
      <div
        className='flex flex-col justify-center shadow-md shadow-red-900 bg-red-700
        w-full px-2 py-4 rounded-xl items-center gap-y-3 sm:justify-around sm:flex-row-reverse'
      >
        <div className='justify-center items-center flex'>
          <span className='size-12 flex justify-center items-center bg-white text-red-700 rounded-full'>
            <i className={`bi bi-${icon} text-2xl pt-1`}></i>
          </span>
        </div>

        <div className='flex flex-col gap-y-2 text-center sm:text-right'>
          <span className='text-[20px] text-black'>{numberWithCommas(todayC) || 0}</span>
          <span className='text-[18px]'>{title} امروز</span>
          <span className='text-[14px]'>{dec}</span>
        </div>
      </div>

      <div
        className='flex flex-row  justify-around bg-red-700 shadow-md shadow-red-900
        w-full py-2 rounded-xl items-center ext-center gap-y-2 sm:gap-y-0 px-2  text-[15px]'
      >
        <div className='flex flex-col justify-center items-center'>
          <span className='text-black'>{numberWithCommas(monthC) || 0}</span>
          <span className='w-fit '> در یک ماه اخیر</span>
        </div>

        <hr className='px-[0.5px] h-full py-3 flex  bg-white' />

        <div className='flex flex-col justify-center items-center'>
          <span className='text-black'>{numberWithCommas(yearC) || 0}</span>
          <span className='w-fit '>در یک سال اخیر</span>
        </div>
      </div>
    </div>
  );
};

export default Card;

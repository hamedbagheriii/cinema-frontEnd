import { Loader2Icon } from 'lucide-react';
import React, { FC } from 'react';

interface LoadingDataProps {
  title?: string;
  dec?: string;
}
const LoadingData: FC<LoadingDataProps> = ({ title = 'لطفا کمی صبر کنید . . .', dec }) => {
  return (
    <div
      className='w-full py-3 shadow-md shadow-red-700/50 rounded-xl flex justify-center
      items-center bg-red-700 flex-col text-white'
    >
      <Loader2Icon className='animate-spin  text-white size-7' />
      <span className='text-white text-[18px] mt-3'>{title}</span>
      {dec && <span className='text-white text-[12px] mt-1'>{dec}</span>}
    </div>
  );
};

export default LoadingData;

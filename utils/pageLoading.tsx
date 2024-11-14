import React, { FC } from 'react';

interface loadingProps {
  title?: string;
  target?: string;
}
const PageLoading: FC<loadingProps> = ({
  title = 'در حال ورود به ',
  target = 'پنل کاربری',
}) => {
  return (
    <div
      dir='rtl'
      className=' loadingLayout flex items-center gap-6 flex-col text-center justify-center h-screen w-full'>
      <span className='text-white text-[28px] text-wrap'>
        {title} <span className='text-black'>{target} !</span>
      </span>
      <span className='text-white text-[23px]'>لطفا صبر کنید . . . </span>
    </div>
  );
};

export default PageLoading;

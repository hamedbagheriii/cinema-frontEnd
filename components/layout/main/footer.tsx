import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div
      dir='rtl'
      className='w-full flex flex-col justify-center mih-h-[500px] rounded-xl  mt-4 items-center '
    >
      <div className='bg-white w-full border-t-4  h-full border-red-700 max-h-[200px] py-5 px-10 rounded-xl'>
        {/* main */}
        <div className='w-full flex flex-col justify-center sm:flex-row-reverse  sm:justify-around items-center'>
          {/* left side  */}
          <div className='w-full flex flex-col mx-auto sm:mx-0 text-center sm:text-left  gap-3 sm:w-1/2'>
            <Link
              href={'/'}
              className='w-fit mx-auto sm:me-0 border-b-2 pb-1 border-black  text-[20px] 
         text-red-700 pl-5 text-nowrap ps-3'
            >
              سینما TV
            </Link>
            <span className='flex mx-auto sm:me-0 '>
              با سینما TV راحت برو سینما
              <i className='bi bi-emoji-laughing-fill ms-2 text-red-700 mt-0.5'></i>
            </span>
          </div>

          <hr className='w-full sm:hidden my-5 mx-auto bg-red-700 flex pt-0.5 rounded-full' />

          {/* right side */}
          <div className='w-full sm:w-1/3 max-w-[200px] flex text-center sm:text-right flex-col font-normal gap-3'>
            <span className='font-bold'>لینک های مفید :</span>

            <div className='flex justify-between '>
              <Link
                href={'/movie'}
                className='mx-auto sm:mx-0 cursor-pointer
         text-red-700 pl-5 text-nowrap ps-3'
              >
                فیلم
              </Link>
              <Link
                href={'/cinema'}
                className='mx-auto cursor-pointer 
         text-red-700 pl-5 text-nowrap ps-3'
              >
                سینما
              </Link>
            </div>
          </div>
        </div>

        {/* bottom */}
        <hr className='w-full my-5 mx-auto sm:w-3/4 bg-gray-600 flex pt-0.5 rounded-full' />

        <div className='w-full pb-2 sm:pb-0 flex flex-col mx-auto text-center gap-2'>
          <span className='text-[14px]'>
            پشتیبانی تلفنی سینما TV از ساعت ۹ الی 24 : 02192009099
          </span>
          <span className='font-normal text-[14px]'>
            تمامی حقوق این نرم افزار برای موسسه دی سینما محفوظ می باشد .
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

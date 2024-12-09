import React, { FC, ReactNode } from 'react';

interface addHeaderProps {
  title: string;
  icon: string;
  children: ReactNode;
  dec?: string | null;
  className?: string;
}
const AddHeaderCompo: FC<addHeaderProps> = ({ title, icon, children, dec = null , className }) => {
  return (
    <div
      dir='rtl'
      className='w-full mt-4 flex flex-col items-center justify-center px-4 py-5'
    >
      <div
        className={`w-10/12 max-w-[600px] h-full  py-4 rounded-lg flex flex-col 
        items-center justify-center border-2 border-black/80 ${className}`}
      >
        <div className='w-full flex flex-col items-center justify-evenly '>
          <i className={`bi bi-${icon} text-[40px]`}></i>
          <span className='text-red-700 text-[25px]'>{title}</span>
          {dec && (
            <span className='text-red-700 mt-1 text-[15px]'>
              {'( '}<span className='text-black'>{dec}</span>{' )'}
            </span>
          )}
          <hr className='w-11/12 my-7 mx-auto bg-red-700  pt-1 rounded-full' />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AddHeaderCompo;

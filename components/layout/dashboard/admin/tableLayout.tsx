import React, { FC } from 'react';
import Layout from './layout';

interface tableLayoutProps {
  children: any;
  title: string;
  icon: string;
}
const TableLayout : FC<tableLayoutProps> = ({children , title , icon}) => {
  return (
    <Layout>
      <div className='border shadow-lg rounded-2xl flex  flex-col px-4 py-5 md:pb-6 '>
        <i className={`bi bi-${icon} mx-auto  text-[50px]`}></i>
        <span
          className='mx-auto text-[22px] text-red-700 border-[3px] px-6 py-1 
          rounded-full border-black'
        >
          {title}
        </span>
        <hr className='w-11/12 my-10 mx-auto bg-red-700  pt-1 rounded-full' />
        {children}
      </div>
    </Layout>
  );
};

export default TableLayout;

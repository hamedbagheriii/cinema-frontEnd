import React, { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='authLayout h-dvh w-full flex-col gap-10 flex items-center justify-center'>
      <span dir='rtl' className='text-red-700 text-[30px] ring px-6 pt-1 ring-red-700
       bg-white rounded-full shadow shadow-lg shadow-red-800'>سینما TV</span>
      {children}
    </div>
  );
};

export default Layout;

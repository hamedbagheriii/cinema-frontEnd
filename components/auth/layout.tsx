import React, { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='authLayout h-dvh w-full flex items-center justify-center'>
      {children}
    </div>
  );
};

export default Layout;

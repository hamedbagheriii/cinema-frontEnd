import { ConfirmAlert } from '@/utils/AlertCompo';
import LinkCompo from '@/utils/Link';
import { useRouter } from 'next/navigation';
import React, { FC, ReactNode } from 'react';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

  return (
    <div
      dir='rtl'
      className='flex flex-col h-dvh mx-auto sm:flex-row w-full pt-6 xl:max-w-[80vw] px-2'
    >
      {/* sidebar */}
      <div className='w-full sm:w-4/12 pt-2'>
        <div
          className='bg-red-800 w-full me-auto sm:max-w-80 shadow-md h-fit
          shadow-black/50 rounded-2xl my-auto text-white gap-3 flex flex-col py-4 px-2'
        >
          <LinkCompo
            title='اطلاعات کاربری'
            iconClass='columns-gap me-2 mt-0.5'
            linkClass={`rounded-full justify-center pb-2 pt-2 hover:bg-black/80 `}
            path={'/dashboard'}
            dir='rtl'
          />
          <hr />
          <LinkCompo
            title='بلیط ها'
            iconClass='ticket-perforated me-2 mt-0.5'
            linkClass={`rounded-full justify-center pb-2 pt-2 hover:bg-black/80 `}
            path={'/dashboard/ticket'}
            dir='rtl'
          />
          <hr />
          <LinkCompo
            title='کیف پول'
            iconClass='wallet2 me-2'
            linkClass={`rounded-full justify-center pb-2 pt-2 hover:bg-black/80 `}
            path={'/dashboard/wallet'}
            dir='rtl'
          />
          <hr />
          <ConfirmAlert
            title='آیا میخواهد از حساب کاربری خارج شوید ؟'
            onClick={() => {
              router.push('/auth/logout');
            }}
          >
            <div className='flex items-center px-2 
            transition-all duration-150 rounded-md
             font-normal justify-center pb-2 pt-2 hover:bg-black/80'>
              <i className='bi bi-box-arrow-right me-2 mt-0.5'></i>
              <span >
                خروج از حساب
              </span>
              <i className={`bi bi-caret-left mt-0.5 ms-auto`}></i>
            </div>
          </ConfirmAlert>
        </div>
      </div>

      {/* content */}
      <div className='w-full mt-6 sm:mt-0 sm:w-9/12 pb-8  px-3 py-2'>{children}</div>
    </div>
  );
};

export default Layout;

import { useToken } from '@/hooks/use-Token';
import LinkCompo from '@/utils/Link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Index = () => {
  const { isLoading, isUser } = useToken();
  const router = useRouter();

  return (
    <div dir='rtl' className='flex flex-col sm:flex-row w-full pt-3 px-2'>
      <div
        className='bg-red-800 w-full sm:w-4/12 sm:max-w-80 shadow-md h-fit
      shadow-black/50 rounded-2xl my-auto text-white gap-3 flex flex-col py-4 px-2'
      >
        <LinkCompo
          title='پنل کاربری'
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
        <LinkCompo
          title='خروج از حساب '
          iconClass='box-arrow-right me-2 mt-0.5'
          linkClass={`rounded-full justify-center pb-2 pt-2 hover:bg-black/80 `}
          path={'/auth/logout'}
          dir='rtl'
        />
      </div>
    </div>
  );
};

export default Index;

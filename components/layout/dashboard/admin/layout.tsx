import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import AccordionCompo, { accDataProps } from '@/utils/accordionCompo';
import { ConfirmAlert, handleShowAlert } from '@/utils/AlertCompo';
import LinkCompo, { handleCheckLink } from '@/utils/Link';
import { useRouter } from 'next/router';
import React, { FC, ReactNode, useState } from 'react';

interface layoutProps {
  children: ReactNode;
  isTicket?: boolean;
}
const Layout: FC<layoutProps> = ({ children, isTicket = false }) => {
  const router = useRouter();

  // ! data for sidebar
  const data: accDataProps[] = [
    {
      title: 'مدیریت سینما',
      path: '/dashboard/admin/cinema',
      icon: 'camera-reels',
      accordionChild: [
        { title: 'مدیریت سینما ها', path: '/dashboard/admin/cinema', icon: 'camera-reels' },
        { title: 'مدیریت فیلم ها', path: '/dashboard/admin/cinema/movies', icon: 'film' },
        {
          title: 'مدیریت بلیط ها',
          path: '/dashboard/admin/cinema/tickets',
          icon: 'ticket-perforated',
        },
      ],
    },
    {
      title: 'مدیریت کاربران',
      path: '/dashboard/admin/users',
      icon: 'people',
      accordionChild: [
        { title: 'مشاهده کاربران', path: '/dashboard/admin/users', icon: 'people' },
        {
          title: 'مدیریت کیف پول ها',
          path: '/dashboard/admin/users/wallets',
          icon: 'wallet2',
        },
      ],
    },
    {
      title: 'مدیریت نقش ها',
      path: '/dashboard/admin/roles',
      icon: 'shield-shaded',
      accordionChild: [
        { title: 'مشاهده نقش ها', path: '/dashboard/admin/roles', icon: 'person-vcard' },
        {
          title: 'مدیریت مجوز ها',
          path: '/dashboard/admin/roles/permissions',
          icon: 'shield-lock-fill',
        },
      ],
    },
  ];

  return (
    <div
      dir='rtl'
      className='flex flex-col mx-auto h-full  
    sm:flex-row w-full pt-6 xl:max-w-[80vw] justify-between px-2'
    >
      {/* sidebar */}
      <div className='w-full hidden max-h-[650px] h-full sm:flex sm:w-4/12 me-auto pt-2'>
        <div
          dir='ltr'
          className='bg-red-800 w-full  overflow-y-auto sm:max-w-80 shadow-md 
          shadow-black/50 rounded-2xl h-full my-auto text-white gap-3 flex flex-col py-3 pt-0 px-2'
        >
          <div dir='rtl' className='w-full h-full justify-between flex-col flex'>
            <AccordionCompo data={data} />

            <div className='mt-14 gap-2 flex flex-col'>
              <hr />
              <ConfirmAlert
                title='آیا میخواهد از حساب کاربری خارج شوید ؟'
                onClick={() => {
                  router.push('/auth/logout');
                }}
              >
                <div
                  className='flex items-center px-2 w-full 
                transition-all duration-150 rounded-md
                font-normal justify-center py-3 hover:bg-black/80'
                >
                  <i className='bi bi-box-arrow-right me-2 mt-0.5'></i>
                  <span>خروج از حساب</span>
                  <i className={`bi bi-caret-left mt-0.5 ms-auto`}></i>
                </div>
              </ConfirmAlert>
            </div>
          </div>
        </div>
      </div>

      {/* content */}
      <div className='w-full mt-6 sm:mt-0  sm:w-8/12 pb-8 px-3 py-2 '>{children}</div>
    </div>
  );
};

export default Layout;

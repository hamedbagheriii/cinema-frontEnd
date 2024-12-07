import React, { FC, useEffect } from 'react';
import FullName from '@/utils/fullName';
import { useRouter } from 'next/router';
import { ConfirmAlert } from '@/components/AlertCompo';
import { localToken } from '@/utils/localToken';
import AccordionCompo, { accDataProps } from '@/components/accordionCompo';
import LinkCompo from '@/components/LinkCompo';

interface sidebarProps {
  isSidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isUser: any;
}
const AdminSidebar: FC<sidebarProps> = ({ isSidebar, setSidebar, isUser }) => {
  const router = useRouter();

  useEffect(() => {
    localToken();
  }, []);

  // ! data for sidebar
  const data: accDataProps[] = [
    {
      title: 'مدیریت سینما',
      path: '/dashboard/admin/cinema',
      icon: 'camera-reels',
      accordionChild: [
        {
          title: 'مدیریت سینما ها',
          path: '/dashboard/admin/cinema',
          icon: 'camera-reels',
        },
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
          title: 'مشاهده مجوز ها',
          path: '/dashboard/admin/roles/permissions',
          icon: 'shield-lock-fill',
        },
      ],
    },
  ];

  return (
    <>
      {/* sidebar layer */}
      <div
        className={`fixed top-0 left-0 z-10 h-dvh
        bg-black/30 sm:hidden sidebarLyer w-full ${isSidebar ? 'active' : ''}`}
        onClick={() => setSidebar(false)}
      ></div>

      {/* sidebar  */}
      <div
        className={`fixed transition-all isSidebar duration-300  
        top-0 left-0 ${isSidebar ? 'active' : ''} sm:hidden  bg-red-700 shadow-lg 
      shadow-red-800 z-10 flex px-6 flex-col`}
      >
        {/* sidebar header */}
        <div
          className={`w-full h-16 flex ${
            isUser ? 'mt-2 mb-1' : 'mt-1 mb-0'
          } justify-between items-center  `}
        >
          <i
            className='bi bi-x-lg cursor-pointer hover:bg-black/50 transition-all duration-150 px-2
          pt-2 pb-1 rounded-md'
            onClick={() => setSidebar(false)}
          ></i>
          {isUser && <FullName icon={true} isUser={isUser} className='pt-1' />}
        </div>
        <hr />

        {/* sidebar content */}
        <div dir='ltr' className='flex text-left mb-28 flex-col w-full '>
          <LinkCompo
            title={'داشبورد'}
            iconClass={`bar-chart-fill me-2`}
            linkClass='my-4'
            path={'/dashboard/admin'}
            dir={'ltr'}
            hover={router.pathname === '/dashboard/admin'}
          />
          <hr />
          <AccordionCompo dir={'ltr'} data={data} />
        </div>

        {/* sidebar footer */}
        {isUser && (
          <div className='mt-auto w-full flex-col mb-2 flex'>
            <hr className='w-full' />
            <ConfirmAlert
              title='آیا میخواهد از حساب کاربری خارج شوید ؟'
              onClick={() => {
                router.push('/auth/logout');
              }}
            >
              <div
                className='flex items-center px-2 mt-2 transition-all duration-150 rounded-md
             font-normal justify-center pb-2 pt-2 hover:bg-black/80'
              >
                <i className='bi bi-box-arrow-right me-2 mt-0.5'></i>
                <span>خروج از حساب</span>
              </div>
            </ConfirmAlert>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminSidebar;

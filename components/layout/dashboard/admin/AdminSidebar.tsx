import React, { FC, useEffect } from 'react';
import FullName from '@/utils/fullName';
import { useRouter } from 'next/router';
import { ConfirmAlert } from '@/components/AlertCompo';
import { localToken } from '@/utils/localToken';
import AccordionCompo, { accDataProps } from '@/components/accordionCompo';
import LinkCompo from '@/components/LinkCompo';
import { useAccess } from '@/hooks/use-Access';

interface sidebarProps {
  isSidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isUser: any;
}
const AdminSidebar: FC<sidebarProps> = ({ isSidebar, setSidebar, isUser }) => {
  const router = useRouter();

  // ! check role =>

  useEffect(() => {
    localToken();
  }, []);

  // ! data for sidebar
  const data: accDataProps[] = [
    {
      title:
        useAccess('get-cinema').res ||
        useAccess('edit-movie').res ||
        useAccess('get-tickets').res
          ? 'مدیریت سینما'
          : false,
      path: '/dashboard/admin/cinema',
      icon: 'camera-reels',
      accordionChild: [
        {
          title: useAccess('get-cinema').res ? 'مدیریت سینما ها' : false,
          path: '/dashboard/admin/cinema/cinemaInfo',
          icon: 'camera-reels',
        },
        {
          title: useAccess('edit-movie').res ? 'مدیریت فیلم ها' : false,
          path: '/dashboard/admin/cinema/movies',
          icon: 'film',
        },
        {
          title: useAccess('get-tickets').res ? 'مدیریت بلیط ها' : false,
          path: '/dashboard/admin/cinema/tickets',
          icon: 'ticket-perforated',
        },
      ],
    },
    {
      title:
        useAccess('get-users').res || useAccess('get-wallets').res
          ? 'مدیریت کاربران'
          : false,
      path: '/dashboard/admin/users',
      icon: 'people',
      accordionChild: [
        {
          title: useAccess('get-users').res ? 'مشاهده کاربران' : false,
          path: '/dashboard/admin/users/usersInfo',
          icon: 'people',
        },
        {
          title: useAccess('get-wallets').res ? 'مدیریت کیف پول ها' : false,
          path: '/dashboard/admin/users/wallets',
          icon: 'wallet2',
        },
      ],
    },
    {
      title:
        useAccess('get-role').res && useAccess('get-perm').res ? 'مدیریت نقش ها' : false,
      path: '/dashboard/admin/roles',
      icon: 'shield-shaded',
      accordionChild: [
        {
          title: useAccess('get-role').res ? 'مشاهده نقش ها' : false,
          path: '/dashboard/admin/roles/rolesInfo',
          icon: 'person-vcard',
        },
        {
          title: useAccess('get-perm').res ? 'مشاهده مجوز ها' : false,
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

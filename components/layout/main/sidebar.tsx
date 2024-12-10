import React, { FC, useEffect } from 'react';
import LinkCompo from '@/components/LinkCompo';
import FullName from '@/utils/fullName';
import { useRouter } from 'next/router';
import { ConfirmAlert } from '@/components/AlertCompo';
import { localToken } from '@/utils/localToken';
import { hasAccess } from '@/utils/hasAccess';
import AccordionCompo, { accDataProps } from '@/components/accordionCompo';

interface sidebarProps {
  isSidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isUser: any;
}
const Sidebar: FC<sidebarProps> = ({ isSidebar, setSidebar, isUser }) => {
  const router = useRouter();

  useEffect(() => {
    localToken();
  }, []);

  const handleChangePath = () => {
    setSidebar(false);
    setTimeout(() => {
      router.push('/dashboard/admin');
    }, 700);
  };

  // ! data for sidebar
  const data: accDataProps[] = [
    {
      title: 'داشبورد',
      path: '/dashboard/user',
      icon: 'columns-gap',
      accordionChild: [
        {
          title: 'اطلاعات کاربری',
          path: '/dashboard/user/profile',
          icon: 'person-circle',
        },
        { title: 'بلیط ها', path: '/dashboard/user/ticket', icon: 'ticket-perforated' },
        {
          title: 'کیف پول',
          path: '/dashboard/user/wallet',
          icon: 'wallet2',
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
            isUser ? 'mt-2 mb-1 ' : 'mt-1 mb-0 '
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
        <div dir='ltr' className='flex text-left space-y-6 flex-col w-full '>
          {isUser && hasAccess('', isUser.roles) !== true ? (
            <AccordionCompo data={data} dir='ltr' />
          ) : isUser && hasAccess('', isUser.roles) === true ? (
            <>
              <span
                onClick={() => handleChangePath()}
                className={`py-3 mt-5 pt-3.5 flex px-2 font-normal
              hover:bg-black/50 transition-all cursor-pointer duration-150 rounded-md `}
              >
                <i className={`me-2 bi bi-person-gear`} style={{ fontSize: 17 }}></i>
                داشبورد مدیریت
                <i className={`bi bi-caret-right mt-0.5 ms-auto`}></i>
              </span>
              <hr />
            </>
          ) : (
            <>
              <LinkCompo
                title='ورود یا ثبت نام'
                iconClass='person-add me-2'
                linkClass='mt-5 pl-3'
                path={'/auth/login'}
              />
              <hr />
            </>
          )}

          <LinkCompo
            title='سینما'
            iconClass='camera-reels me-2 -mt-0.5'
            linkClass={`pl-3 pt-4 `}
            path={'/cinema'}
          />
          <hr />
          <LinkCompo
            title='فیلم'
            iconClass='film me-2 mt-0.5'
            linkClass={`pl-3 pt-4`}
            path={'/movie'}
          />
        </div>

        {/* sidebar footer */}
        {isUser && (
          <div className='mt-auto w-full  flex-col mb-2 flex'>
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

export default Sidebar;

import React, { FC, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import LinkCompo, { handleCheckLink } from '@/utils/Link';
import FullName from '@/utils/fullName';
import { useRouter } from 'next/router';
import { ConfirmAlert } from '@/utils/AlertCompo';
import { localToken } from '@/utils/localToken';
import { hasAccess } from '@/utils/hasAccess';

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
            isUser ? 'mt-3 mb-2' : 'mt-1 mb-0'
          } justify-between items-center  `}
        >
          <i
            className='bi bi-x-lg cursor-pointer hover:bg-black/50 transition-all duration-150 px-2
          pt-2 pb-1 rounded-md'
            onClick={() => setSidebar(false)}
          ></i>
          {isUser && <FullName icon={true} isUser={isUser} className='pt-1' />}
        </div>
        <hr className='mb-4' />

        {/* sidebar content */}
        <div dir='ltr' className='flex text-left space-y-6 flex-col w-full '>
          {isUser && hasAccess('', isUser.roles) !== true ? (
            <Accordion type='single' collapsible>
              <AccordionItem value='item-1' className='text-white Accordion '>
                <AccordionTrigger
                  className={`text-[16px] text-white px-3
                mb-3 decoration-transparent font-normal hover:bg-black/50 
                transition-all duration-150 rounded-md 
                ${handleCheckLink('/dashboard', router)}`}
                >
                  <div className='flex gap-2 text-center '>
                    <i className='bi bi-columns-gap mt-0.5'></i>
                    داشبورد
                  </div>
                </AccordionTrigger>

                <AccordionContent className='flex flex-col space-y-3 '>
                  <hr className='w-full' />
                  <LinkCompo
                    title='اطالاعات کاربری'
                    linkClass={`pl-8 `}
                    iconClass='person-circle me-2'
                    path={'/dashboard/user/profile'}
                  />

                  <hr className='w-11/12 ms-auto' />
                  <LinkCompo
                    title='بلیط ها'
                    iconClass='ticket-perforated me-2 '
                    linkClass={`pl-8`}
                    path={'/dashboard/user/ticket'}
                  />

                  <hr className='w-11/12 ms-auto' />
                  <LinkCompo
                    title='کیف پول'
                    linkClass={`pl-8 `}
                    iconClass='wallet2 me-2'
                    path={'/dashboard/user/wallet'}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : isUser && hasAccess('', isUser.roles) === true ? (
            <>
              <LinkCompo
                title='داشبورد مدیریت'
                iconClass='person-gear me-2'
                linkClass='mt-2 pl-3'
                path={'/dashboard/admin'}
              />
              <hr />
            </>
          ) : (
            <>
              <LinkCompo
                title='ورود یا ثبت نام'
                iconClass='person-add me-2'
                linkClass='mt-2 pl-3'
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

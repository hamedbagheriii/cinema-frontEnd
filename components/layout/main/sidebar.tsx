import React, { FC } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import LinkCompo from '@/utils/Link';

interface sidebarProps {
  isSidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isUser: any;
}
const Sidebar: FC<sidebarProps> = ({ isSidebar, setSidebar, isUser }) => {
  return (
    <>
        {/* sidebar layer */}
        <div className={`fixed top-0 left-0 z-10 h-dvh
        bg-black/30 sm:hidden sidebarLyer w-full ${isSidebar ? 'active' : ''}`}
        onClick={() => setSidebar(false)}></div>


        {/* sidebar  */}
        <div className={`fixed transition-all isSidebar duration-300  
        top-0 left-0 ${isSidebar ? 'active' : ''} sm:hidden h-dvh bg-red-700 shadow-lg
      shadow-red-800 z-10 flex px-6 flex-col`} >

        {/* sidebar header */}
        <div className='w-full h-16 flex mb-3 pt-2 justify-between items-center  '>
          <i className='bi bi-x-lg cursor-pointer' onClick={() => setSidebar(false)}></i>
        </div>
        <hr className='mb-4' />


        {/* sidebar content */}
        <div dir='ltr' className='flex text-left space-y-6 flex-col w-full h-full '>
          {isUser ? (
            <Accordion type='single' collapsible>
              <AccordionItem value='item-1' className='text-white Accordion'>
                <AccordionTrigger className='text-[16px] text-white
                mb-3 decoration-red-700 font-normal'>
                  <div className='flex gap-2 text-center'>
                    <i className='bi bi-columns-gap mt-0.5'></i>
                    داشبورد
                  </div>
                </AccordionTrigger>

                <AccordionContent className='flex flex-col space-y-3 '>
                  <hr className='w-full' />
                  <LinkCompo
                    title='پنل کاربری'
                    linkClass='pl-8'
                    iconClass='person-circle me-2'
                    path={'/dashboard'}
                  />

                  <hr className='w-11/12 ms-auto' />
                  <LinkCompo
                    title='بلیط ها'
                    iconClass='ticket-perforated me-2'
                    linkClass='pl-8'
                    path={'/dashboard/ticket'}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <>
              <LinkCompo
                title='ورود یا ثبت نام'
                iconClass='person-add me-2'
                linkClass='mt-2'
                path={'/auth/login'}
              />
              <hr />
            </>
          )}

          <LinkCompo
            title='سینما'
            iconClass='camera-reels me-2 -mt-0.5'
            path={'/cinema'}
          />
          <hr />
          <LinkCompo
            title='فیلم'
            iconClass='film me-2 mt-0.5'
            linkClass='mt-2'
            path={'/movie'}
          />
        </div>

        {/* sidebar footer */}
        {isUser && (
          <div className='mt-auto flex-col mb-2 flex'>
            <hr className='w-full' />
            <LinkCompo
              title='خروج از حساب'
              iconClass='box-arrow-right me-2 mt-0.5'
              linkClass='text-center mx-auto'
              path={'/auth/logout'}
            />
          </div>
        )}
       </div>
    </>
  );
};

export default Sidebar;

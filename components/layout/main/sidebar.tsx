import Link from 'next/link';
import React, { FC } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface sidebarProps {
  isSidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isUser: any;
}
const Sidebar: FC<sidebarProps> = ({ isSidebar, setSidebar, isUser }) => {
  return (
    <div
      className={`fixed transition-all isSidebar duration-300  
      top-0 left-0 ${isSidebar ? 'active' : ''} sm:hidden h-dvh bg-red-700 shadow-lg
      shadow-red-800 z-10 flex px-6 flex-col`}
    >
      {/* sidebar header */}
      <div className='w-full h-16 flex justify-between items-center  '>
        <i className='bi bi-x-lg cursor-pointer' onClick={() => setSidebar(false)}></i>
      </div>
      <hr className='mb-4' />
      <div dir='rtl' className='flex text-center space-y-6 flex-col w-full h-full '>
        {isUser ? (
          <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
            </AccordionItem>
          </Accordion>
        ) : (
          <Link href={'/auth/login'} className={' py-3 px-10'}>
            ورود یا ثبت نام
          </Link>
        )}
        <hr />
        <Link href={'/cinema'} className={' py-3 px-10'}>
          سینما
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

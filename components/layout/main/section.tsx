import React, { FC, ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    title: string;
    className ?: string;
}
const Section : FC<SectionProps> = ({children , title , className}) => {
    return (
        <div dir='rtl' className={`w-full mt-10 flex-col md:mt-16 flex px-4 md:px-16 ${className}`}>
        <span className='flex text-[20px] cursor-pointer'>
          {title} <i className='bi bi-caret-left-fill mt-0.5 mx-1'></i>
        </span>

        <div className='w-full mt-5 flex  h-fit flex-wrap flex-row justify-evenly gap-y-7 '>
            {children}
        </div>
      </div>
    );
}

export default Section;

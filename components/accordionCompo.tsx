import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React, { FC } from 'react';
import LinkCompo, { handleCheckLink } from './LinkCompo';
import { useRouter } from 'next/router';

export interface accDataProps {
  title: string | boolean;
  path: string;
  icon: string;
  accordionChild: {
    title: string | boolean;
    path: string;
    icon: string;
  }[];
}
interface accordionProps {
  data: accDataProps[];
  bgColor?: string;
  dir?: string;
}

const AccordionCompo: FC<accordionProps> = ({ data, bgColor = '', dir = 'rtl' }) => {
  const router = useRouter();
  
  return (
    <Accordion type='single' collapsible>
      {data.map((t: accDataProps, i: number) =>
        t.title ? (
          <AccordionItem
            key={`acc-${t.title}-${i}`}
            value={`item-${i + 1}`}
            className='text-white mt-3 Accordion '
          >
            <AccordionTrigger
              className={`text-[16px] text-white px-3
            mb-3 decoration-transparent font-normal ${bgColor} hover:bg-black/70 
            transition-all duration-150 rounded-md 
            ${handleCheckLink(t.path, router)}`}
            >
              <div className='flex gap-2 text-center '>
                <i className={`bi bi-${t.icon} mt-0.5`}></i>
                {t.title}
              </div>
            </AccordionTrigger>

            <AccordionContent className='flex flex-col space-y-3 '>
              <hr className='w-full' />
              <div className='flex flex-col space-y-3 pl-2'>
                {t.accordionChild.map((item: any) =>(
                  item.title ? (
                    <LinkCompo
                      key={`itemAcc-${t.title}-${item.title}`}
                      title={item.title}
                      iconClass={`${item.icon} me-2`}
                      linkClass='ps-4'
                      border={true}
                      path={item.path}
                      dir={dir}
                    />
                  ) : null)
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ) : null
      )}
    </Accordion>
  );
};

export default AccordionCompo;

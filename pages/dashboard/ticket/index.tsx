import Layout from '@/components/layout/dashboard/layout';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { useToken } from '@/hooks/use-Token';
import { seatProps } from '@/pages/event/[...eventID]';
import { convertDate } from '@/utils/convertDate';
import React, { useEffect, useState } from 'react';

const Index = () => {
  const { isUser } = useToken();
  const [tickets, setTieckets] = useState<any[]>([]);

  // ! get tickets data =>
  const handleGetTickets = async () => {
    setTieckets(isUser?.tickets);
  };

  useEffect(() => {
    handleGetTickets();
  }, [isUser]);
console.log(tickets);

  return (
    <Layout isTicket>
      <div className='w-full flex flex-col gap-4 justify-center items-center'>
        {/* header */}
        <div className='w-full flex flex-col gap-4 '>
          <div className='flex  items-center w-full px-5 gap-3 justify-center'>
            <i
              className='bi bi-ticket-perforated text-red-800 -mt-1'
              style={{ fontSize: 40 }}
            ></i>
            <span className='text-center text-[20px] -mt-3 text-red-800 font-bold'>
              بلیط های من
            </span>
          </div>
          <hr className='bg-black/20 h-1 mb-2 mx-auto -mt-3 w-11/12 max-w-[700px] rounded-full' />
        </div>

        {/* tickets */}
        {tickets?.length > 0 ? (
          <>
            {tickets.map((ticket: any) => (
              // tiecket
              <div
                className={`border-2
                w-full max-w-[700px] rounded-lg pt-4 flex justify-center
                items-center  px-4 flex-col sm:min-h-[160px] border-black`}
                key={`${ticket.ticket}`}
              >
                {/* top section */}
                <div
                  className={`w-full flex justify-center items-center 
                  sm:justify-between text-center sm:text-right gap-y-4 
                  flex-col sm:flex-row h-full text-[15px]`}
                >
                  {/* movie and cinema info */}
                  <div
                    className='w-full flex h-full mb-auto font-normal 
                  flex-col gap-2 sm:items-start '
                  >
                    <span className='font-bold text-[16px]'>
                      <i className='bi bi-camera-reels-fill me-2 text-red-700'></i>
                      {`فیلم : ${ticket.movieData.movieName}`}
                    </span>
                    <span>
                      <i className='bi bi-geo-alt-fill me-2 text-red-700'></i>
                      {`سینما : ${ticket.cinemaData.cinemaName}`}
                    </span>
                    <span>
                      <i className='bi bi-door-open-fill me-2 text-red-700'></i>
                      {`سالن : ${ticket.hallData.hallName}`}
                    </span>
                    <span>
                      <i className='bi bi-tag-fill me-2 text-red-700'></i>
                      {`تعداد صندلی ها :  ${ticket.rows.length}`}
                    </span>
                  </div>

                  <hr className='bg-gray-400 pt-0.5 my-1 mx-auto w-full flex sm:hidden rounded-full' />

                  {/* ticket data */}
                  <div className='w-full flex mb-auto flex-col gap-2 sm:items-start h-full font-normal'>
                    <span className='font-bold text-[16px]'>
                      <i className='bi bi-ticket-perforated-fill me-2 text-[17px] text-red-700'></i>
                      {`شماره بلیط : `}
                      <span className='bg-slate-200 ms-1 px-2 text-[15px] pt-0.5 rounded-sm font-normal'>
                        {ticket.ticket}
                      </span>
                    </span>
                    <span>
                      <i className='bi bi-calendar-event-fill me-2 text-red-700'></i>
                      {`تاریخ : ${convertDate(ticket.date)}`}
                    </span>
                    <span>
                      <i className='bi bi-clock-fill me-2 text-red-700'></i>
                      {`ساعت : ${ticket.Time}`}
                      <i></i>
                    </span>
                    <span>
                      <i className='bi bi-info-circle-fill me-2 text-red-700'></i>
                      وضعیت :
                      <span
                        className={`${
                          ticket.useTicket
                            ? 'text-green-700 bg-green-600/20'
                            : 'text-red-700 bg-red-200'
                        } ms-2 pe-2 ps-1 pt-0.5 rounded-sm`}
                      >{` ${ticket.useTicket ? 'نهایی شده' : 'نهایی نشده'}`}</span>
                    </span>
                  </div>
                </div>

                {/* bottom section */}
                <div className='flex w-full flex-col h-full'>
                  <hr className='bg-red-700 pt-0.5 mt-5 mx-auto w-full  sm:flex rounded-full' />

                  <Accordion type='single' collapsible className='w-full'>
                    <AccordionItem value='item-1' className='border-0'>
                      <AccordionTrigger className='text-red-700 flex font-bold decoration-white pe-1'>
                        مشاهده صندلی ها
                      </AccordionTrigger>
                      <AccordionContent
                        className='w-full flex items-center
                      justify-start gap-2 flex-wrap pb-6'
                      >
                        {ticket.rows.map((t: seatProps) => (
                          <div
                            className='flex gap-2 h-[36px] max-w-[140px] min-w-[130px] px-2 
                            text-[10px] items-center rounded-md text-nowrap
                          bg-white border-2 border-black text-red-700 justify-between'
                            key={`${t.row}-${t.selectedSeats}-${ticket.ticket}-${Math.random()*100000}`}
                          >
                            <div className='flex flex-row w-full justify-around'>
                              <span>ردیف : {t.row} </span>
                              <span> صندلی {t.selectedSeats} </span>
                            </div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className='w-full flex mx-auto  max-w-[700px] px-4'>
            <span className='text-center w-full bg-red-200 py-2 rounded-lg text-red-700'>شما هنوز هیچ بلیطی ندارید .</span>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;

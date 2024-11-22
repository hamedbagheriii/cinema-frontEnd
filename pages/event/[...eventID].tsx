import { Button } from '@/components/ui/button';
import { convertDate } from '@/utils/convertDate';
import exp from 'constants';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

interface eventProps {
  movieData: any;
  cinemaData: any;
  reservedSeats: any;
}
const Event: FC<eventProps> = ({ movieData, cinemaData, reservedSeats }) => {
  const router = useRouter();

  const { hall, date, time } = router.query;
  const hallData = cinemaData.halls.filter((t: any) => t.id == hall);
  const seats : any[] = [
    {id : 1, bgColor : 'bg-white' , title : 'خالی عادی'},
    {id : 2, bgColor : 'bg-red-700' , title : 'انتخاب شما'},
    {id : 3, bgColor : 'bg-black' , title : 'رزرو شده'},
  ]

  console.log(movieData);
  console.log(cinemaData);
  console.log(reservedSeats);

  return (
    <div
      dir='rtl'
      className='w-full flex pt-5 flex-col items-center px-4  justify-center'
    >
      <div className='w-full flex-col h-full sm:flex-row bg-gray-200 py-5 px-4 rounded-xl flex justify-between items-center'>
        {/* right */}
        <div className='w-full flex-col sm:flex-row  sm:w-3/4 flex justify-start items-center'>
          <Image
            src={movieData.image[0].url}
            alt={movieData.movieName}
            width={1}
            height={1}
            className='rounded-xl w-[120px] h-full  '
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            loading='lazy'
            placeholder='empty'
          />
          <div className='flex flex-col text-center sm:text-right mt-3 sm:mt-0 gap-3 w-full ps-2'>
            <span className='text-[20px]'>
              <i className='bi bi-camera-reels-fill me-2 text-red-700'></i>
              {movieData.movieName} 
            </span>
            <span className='font-normal'>
                <i className='bi bi-geo-alt-fill me-1 text-red-700'></i>
              سینما {cinemaData.cinemaName} , {cinemaData.city}
            </span>
            <span className='font-normal'>
                <i className='bi bi-door-open-fill me-1 text-red-700'></i>
                سالن {hallData[0].hallName}
            </span>
            <span className='w-full'>
              <i className='bi bi-calendar-event-fill me-2 text-red-700'></i>
              تاریخ : {`${convertDate(date as string)} ساعت : ${time}`}
            </span>
          </div>
        </div>

        <hr className='sm:hidden w-full my-5 mx-auto bg-red-700/50 flex pt-1 rounded-full' />

        {/* left */}
        <div className='w-full sm:w-1/3 items-center sm:items-end gap-5 sm:gap-0 sm:min-h-[150px] py-1 justify-between h-full flex flex-col'>
            <Button className='mx-auto sm:mx-0 w-1/2 sm:max-w-[130px] bg-white text-black
            border-red-700 border-2 hover:bg-red-700  flex hover:text-white'
            onClick={()=>router.back()}
            >
               <i className='bi bi-pencil-square mt-1'></i>
               تغیر سانس
            </Button>
            <div className='flex justify-evenly w-[160px] '>
                {seats.map((t: any) => (
                    <div key={t.id} className='flex flex-col gap-1 items-center'>
                        <span className={`${t.bgColor} text-red-700 block size-3 rounded-full`}></span>
                        <span className='text-[10px] fonn'>{t.title}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Event;

export const getServerSideProps = async (props: any) => {
  const movieURL = process.env.NEXT_PUBLIC_MOVIES_URL;
  const cinemaURL = process.env.NEXT_PUBLIC_CINEMA_URL;

  const movieData = await fetch(`${movieURL}/${props.query.eventID[0]}`).then((res) =>
    res.json()
  );
  const cinemaData = await fetch(`${cinemaURL}/${props.query.cinema}`).then((res) =>
    res.json()
  );
  const reservedSeats = await fetch(
    `${movieURL}/resarvedSeats/${props.query.eventID[0]}/${props.query.cinema}/${props.query.hall}/${props.query.date}/${props.query.time}`
  ).then((res) => res.json());

  return {
    props: {
      movieData: movieData.data,
      cinemaData: cinemaData.data,
      reservedSeats: reservedSeats.data,
    },
  };
};

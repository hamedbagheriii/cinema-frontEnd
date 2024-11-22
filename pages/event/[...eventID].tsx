import { Button } from '@/components/ui/button';
import { convertDate } from '@/utils/convertDate';
import { numberWithCommas } from '@/utils/numbWithCommas';
import exp from 'constants';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { it } from 'node:test';
import React, { FC, useEffect, useState } from 'react';

interface eventProps {
  movieData: any;
  cinemaData: any;
  reservedSeats: any;
}
interface seatProps {
  selectedSeats: number[];
  row: number;
}
const Event: FC<eventProps> = ({ movieData, cinemaData, reservedSeats }) => {
  const router = useRouter();
  const [rows, setRowsArr] = useState<number[]>([]); // for rows
  const [seat, setSeatsArr] = useState<number[]>([]); // for seats
  const [hallData, setHallData] = useState<any>([]);
  const [selectSeats, setSelectSeats] = useState<seatProps[]>([]);
  const { hall, date, time } = router.query;
  const seatsCircle: any[] = [
    { id: 1, bgColor: 'bg-white', title: 'خالی عادی' },
    { id: 2, bgColor: 'bg-red-700', title: 'انتخاب شما' },
    { id: 3, bgColor: 'bg-black', title: 'رزرو شده' },
  ];

  //   console.log(movieData);
  //   console.log(cinemaData);
  console.log(selectSeats);
  //   console.log(hallData);

  //   ! handle hall data
  const handleHallData = () => {
    const Data = cinemaData.halls.filter((t: any) => t.id == hall);

    setHallData(Data[0]);
  };

  //   ! handle Rows and seats
  const handleRows = () => {
    let numRows: number[] = [];
    let numSeats: number[] = [];

    for (let i = 1; i <= hallData.maximumRows; i++) {
      numRows.push(i);
    }
    for (let i = 1; i <= 15; i++) {
      numSeats.push(i);
    }

    setRowsArr(numRows);
    setSeatsArr(numSeats);
  };

  //   ! handle select and remove seats
  const handleSelectSeats = (seatobj: seatProps) => {
    if (selectSeats.length <= 10) {
        let newSeats = [...selectSeats];

        let checkRows = newSeats.filter(
          (item) =>
            item.row === seatobj.row && item.selectedSeats[0] === seatobj.selectedSeats[0]
        );
        if (checkRows.length === 0) {
          newSeats.push(seatobj);
        } else {
          newSeats.splice(newSeats.indexOf(seatobj), 1);
        }
    
        setSelectSeats(newSeats);
    }
  };

  //   ! handle Show seats
  const handleShowSeats = (seatobj: seatProps) => {
    const isSelected = selectSeats.filter(
      (item) =>
        item.row === seatobj.row && item.selectedSeats[0] === seatobj.selectedSeats[0]
    );
    const isReserved = reservedSeats.filter(
      (item: seatProps) =>
        item.row === seatobj.row && item.selectedSeats[0] === seatobj.selectedSeats[0]
    );
    if (isSelected.length > 0) {
      return 'bg-red-700 text-white';
    } else if (isReserved.length > 0) {
      return 'bg-black text-white';
    } else {
      return 'bg-white text-black';
    }
  };

  useEffect(() => {
    handleHallData();
  }, []);

  useEffect(() => {
    handleRows();
  }, [hallData]);

  return (
    <div
      dir='rtl'
      className='w-full flex pt-5 flex-col  items-center px-4  justify-start'
    >
      {/* header */}
      <div
        className='w-full flex-col h-full sm:flex-row bg-gray-200 
      py-5 px-4 rounded-xl flex justify-between items-center'
      >
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
              سالن {hallData.hallName}
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
          <Button
            className='mx-auto sm:mx-0 w-full sm:max-w-[130px] bg-white text-black
            border-red-700 border-2 hover:bg-red-700  flex hover:text-white'
            onClick={() => router.back()}
          >
            <i className='bi bi-pencil-square mt-1'></i>
            تغیر سانس
          </Button>
          <div className='flex justify-evenly w-[160px] '>
            {seatsCircle.map((t: any) => (
              <div key={t.id} className='flex flex-col gap-1 items-center'>
                <span
                  className={`${t.bgColor} text-red-700 block size-3 rounded-full`}
                ></span>
                <span className='text-[10px] fonn'>{t.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className='w-full mt-5 bg-gray-400 text-center
       text-[14px] py-0.5 text-white rounded-md'
      >
        صحنه اجرا
      </div>

      {/* main */}
      <div className='mainRows overflow-auto flex flex-col items-center justify-center mt-4 bg-gray-200 rounded-md py-3 '>
        {/* seats */}
        <div className='px-4 mx-auto flex flex-col gap-2  '>
          <span className='text-[14px] font-normal  mx-auto my-2 w-full text-center'>
            جلوی سالن
          </span>
          {rows.map((t: number) => (
            <div key={t} className='w-[100%]  flex justify-center items-center'>
              <span className='min-w-[60px]'>ردیف {t}</span>

              <div className='flex gap-2 ms-5'>
                {seat.map((s: number) => (
                  <span
                    className={`${handleShowSeats({
                      row: t,
                      selectedSeats: [s],
                    })} rounded-full cursor-pointer border-2 border-black w-[30px] 
                    h-[30px] flex justify-center items-center
                    text-[12px]`}
                    key={s}
                    onClick={() =>
                      handleSelectSeats({
                        selectedSeats: [s],
                        row: t,
                      })
                    }
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <span className='text-[14px] font-normal  mx-auto my-2 w-full text-center'>
            انتهای سالن
          </span>
        </div>
      </div>

      {/* select seats */}
      {selectSeats.length > 0 && (
        <div className='w-full min-h-[80px] fixed bottom-0 bg-gray-100 border-t-4 border-red-700 text-center flex items-center justify-evenly gap-2 flex-wrap rounded-t-xl py-2'>
          {selectSeats.map((t: seatProps) => (
            <div className='flex gap-2 h-[40px] max-w-[210px] px-2 text-[10px] items-center rounded-md text-nowrap
             bg-white border-2 border-black text-red-700'
              key={`${t.row}-${t.selectedSeats[0]}`}
            >
              <span>ردیف : {t.row} ،</span>
              <span> صندلی {t.selectedSeats[0]} ،</span>
              <span> {numberWithCommas(movieData.price)} تومان</span>
            </div>
          ))}
        </div>
      )}
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

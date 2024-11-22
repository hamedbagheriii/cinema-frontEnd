import exp from 'constants';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

interface eventProps {
  movieData: any;
  cinemaData: any;
  reservedSeats: any;
}
const Event: FC<eventProps> = ({ movieData, cinemaData, reservedSeats }) => {
  const router = useRouter();
  // console.log(router.query);
  console.log(movieData);
  console.log(cinemaData);
  console.log(reservedSeats);
  

  return (
    <div className='w-full flex pt-5 flex-col items-center justify-center'>
      <div className='w-full flex '></div>
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

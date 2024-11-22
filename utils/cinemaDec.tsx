import React, { FC } from 'react';

interface cinemaDec {
    cinemaData : any ;
    className ?: string;
    titleClass ?: string;
    locClass ?: string;
}
const CinemaDec : FC<cinemaDec> = ({cinemaData , className , titleClass , locClass}) => {
  return (
    <>
      <span className={`text-[24px] mb-2 ${titleClass}`}>
        سینما {cinemaData.cinemaName} 
      </span>

      <span className='font-normal'>
        <i className={`bi bi-geo-alt-fill me-1 ${locClass}`}></i>
        {cinemaData.province + ' , ' + cinemaData.city + ' , ' + cinemaData.address}
      </span>

      <div className={`flex gap-5 text-[20px] mt-10 ${className}`}>
        <i className='bi bi-cup-hot-fill'></i>
        <i className='bi bi-shop'></i>
        <i className='bi bi-cart2'></i>
        <i className='bi bi-joystick'></i>
        <i className='bi bi-ticket-detailed-fill pt-0.5'></i>
      </div>
    </>
  );
};

export default CinemaDec;

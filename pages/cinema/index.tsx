import Section from '@/components/layout/main/section';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

interface cinemaProps {
    cinemas : any[]
}
const Index : FC<cinemaProps> = ({cinemas}) => {
  const router = useRouter()

  return (
    <div className='w-full h-full px-4'>
     {/* cienmas */}
     <Section title='سینماها' className={'mt-0 pt-4 md:mt-0'}>
        {cinemas.map((cinema: any) => (
          <div
            key={cinema.id}
            className='text-center max-w-[250px] lg:max-w-[300px] p-1 flex flex-col gap-2 w-1/2 md:w-1/4 '
          >
            <div className='w-full h-full relative'
            onClick={() => router.push(`/cinema/${cinema.id}`)}
            >
              <div
                className='w-full h-full absolute bg-transparent
                hover:bg-black/20 transition-all cursor-pointer duration-150 rounded-xl'
              ></div>
              <Image
                src={cinema.image[0].url}
                alt={cinema.cinemaName}
                width={1}
                height={1}
                className='rounded-xl w-full h-full cursor-pointer'
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                loading='lazy'
                placeholder='empty'
              />
            </div>

            {cinema.cinemaName}
          </div>
        ))}
      </Section>
    </div>
  )
};

export default Index;

export const getServerSideProps = async () => {
  const cinemaURL = process.env.NEXT_PUBLIC_CINEMA_URL as string;
  const cinemas = await fetch(cinemaURL).then((res) => res.json());

  return {
    props: {
      cinemas: cinemas.data,
    },
  };
};

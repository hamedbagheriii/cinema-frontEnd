import React, { FC } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

interface SliderProps {
  data: { url: string; name: string }[];
}
const Slider: FC<SliderProps> = ({ data }) => {
  return (
    <Carousel className='p-2'>
      <CarouselContent className=' max-w-[800px]'>
        {data.map((t: any) => (
          <CarouselItem key={t.id}>
            <Image
              src={t.url}
              alt={t.name}
              width={1}
              height={1}
              className='w-full h-fit rounded-xl '
              loading='lazy'
              placeholder='empty'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Slider;

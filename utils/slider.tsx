import React, { FC } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

interface SliderProps {
  data: { url: string; name: string }[];
}
const Slider: FC<SliderProps> = ({ data }) => {
  return (
    <Carousel
      className='mx-auto p-2 z-0 relative'
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnFocusIn: false,
          stopOnInteraction: false,
          stopOnMouseEnter: false,
        }) as any,
      ]}
    >
      <CarouselContent className=' max-w-[800px] lg:ps-8  lg:pe-6 lg:gap-4'> 
        
        {data.map((t: any) => (
          <CarouselItem key={t.id}>
            <Image
              src={t.url}
              alt={t.name}
              width={1}
              height={1}
              className='w-full md:h-[300px] lg:h-[250px] rounded-xl cursor-pointer'
              style={{ objectFit: 'cover' , objectPosition: 'center' }}
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

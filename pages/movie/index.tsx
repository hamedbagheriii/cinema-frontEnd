import Section from '@/components/layout/main/section';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface moviesProps {
  movies: any[];
}
const Index: FC<moviesProps> = ({ movies }) => {
  const router = useRouter();

  return (
    <div className='w-full px-4'>
      {/* cienmas */}
      <Section title='فیلم سینمایی' className={'mt-0 pt-5 md:mt-0'}>
        {movies.map((movie: any) => (
          <div
            key={movie.id}
            className='text-center max-w-[250px] lg:max-w-[300px] p-1 flex flex-col gap-2 w-1/2 md:w-1/4 '
          >
            <div
              className='w-full h-full relative'
              onClick={() => router.push(`/movie/${movie.id}`)}
            >
              <div
                className='w-full h-full absolute bg-transparent
                hover:bg-black/20 transition-all cursor-pointer duration-150 rounded-xl'
              ></div>
              <Image
                src={movie.image[0].url}
                alt={movie.movieName}
                width={1}
                height={1}
                className='rounded-xl w-full h-full cursor-pointer'
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                loading='lazy'
                placeholder='empty'
              />
            </div>

            {movie.movieName}
          </div>
        ))}
      </Section>
    </div>
  );
};

export default Index;

export const getServerSideProps = async () => {
  const movieURL = process.env.NEXT_PUBLIC_MOVIES_URL as string;
  const movies = await fetch(movieURL).then((res) => res.json());

  return {
    props: {
      movies: movies.data,
    },
  };
};

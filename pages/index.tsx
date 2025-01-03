import Section from '@/components/layout/main/section';
import Slider from '@/components/sliderCompo';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HomeProps {
  movies: any[];
  slider: any[];
  cinemas: any[];
}
export default function Home({ movies, slider, cinemas }: HomeProps) {
  const router = useRouter();

  return (
    <div className='w-full flex pt-5   justify-center items-center flex-col'>
      {}
      {/* slider */}
      <Slider data={slider} />

      {/* movies */}
      <Section title='فیلم سینمایی' className=''>
        {movies.map(
          (movie: any) =>
            movie.isShow && (
              <div
                key={movie.id}
                className='text-center max-w-[300px]  p-1 flex flex-col gap-2 w-1/3 md:w-1/4 lg:w-1/5'
              >
                <div
                  className='w-full h-full relative xl:max-w-[190px] mx-auto text-center'
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
            )
        )}
      </Section>

      <hr className='w-11/12 mx-auto mt-14 mb-5 bg-red-800 pt-0.5 rounded-full' />

      {/* cienmas */}
      <Section title='سینماها' className='pb-5 '>
        {cinemas.map((cinema: any) => (
          <div
            key={cinema.id}
            className='text-center max-w-[250px] lg:max-w-[300px] p-1 flex flex-col gap-2 w-1/2 md:w-1/4 '
          >
            <div
              className='w-full h-full relative'
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
  );
}

export const getServerSideProps = async () => {
  const movieURL = process.env.NEXT_PUBLIC_MOVIES_URL as string;
  const cinemaURL = process.env.NEXT_PUBLIC_CINEMA_URL as string;
  const slider = await fetch(movieURL + '/slider').then((res) => res.json());
  const movies = await fetch(movieURL).then((res) => res.json());
  const cinemas = await fetch(cinemaURL).then((res) => res.json());

  return {
    props: {
      movies: movies.data,
      slider: slider.data,
      cinemas: cinemas.data,
    },
  };
};

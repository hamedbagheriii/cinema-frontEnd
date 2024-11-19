import { getMovieService } from '@/services/movie/movie';
import Slider from '@/utils/slider';
import Image from 'next/image';
import Link from 'next/link';

interface HomeProps{
  movies : any[] ;
  slider : any[];
}
export default function Home({movies , slider} : HomeProps) {
  console.log(slider);
  
  return (
    <div className='w-full flex pt-5 justify-center items-center flex-col' >

      <Slider data={slider} />

      {/* {slider.map((t : any)=>(
        <div key={t.id}>
          <Image
          src={t.url}
          alt={t.name}
          width={1}
          height={1}
          className='w-52 h-fit'
          loading='lazy'
          placeholder='empty'
          />
          {t.movieName}
        </div>
      ))} */}
    </div>
  );
}


export const getServerSideProps = async ()=>{
  const movieURL = process.env.NEXT_PUBLIC_MOVIES_URL as string ;
  const slider = await fetch(movieURL+'/slider').then(res => res.json());
  const movies = await fetch(movieURL).then(res => res.json());

  return {
    props : {
      movies : movies.data,
      slider : slider.data
    }
  }
}
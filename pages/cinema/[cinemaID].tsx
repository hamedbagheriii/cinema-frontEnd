import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

interface cinemaProps {
    cinemaData : any
}
const Cinema : FC<cinemaProps> = ({cinemaData}) => {
    
    return (
        <div dir='rtl' className='w-full pt-8 flex flex-col justify-center items-center'>
            <div className={`w-full h-full sm:h-[280px] shadow-sm shadow-gray-900 cinemaBG md:px-8 flex flex-col sm:flex-row justify-center items-center`}>
                <div className='w-full sm:w-6/12 h-full flex justify-start  items-center'>
                    <Image
                        src={cinemaData.image[0].url}
                        alt={cinemaData.cinemaName}
                        width={1}
                        height={1}
                        className='rounded-xl w-full h-full sm:max-w-[400px] sm:h-4/5 cursor-pointer'
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        loading='lazy'
                        placeholder='empty'
                    />
                </div>
                
                <div className='w-full sm:w-6/12 h-full flex flex-col justify-satart items-center'>
                    s
                </div>
            </div>

        </div>
    );
}

export default Cinema;


export const getStaticPaths = async ()=>{
    const cinemaURL = process.env.NEXT_PUBLIC_CINEMA_URL as string;
    const res = await fetch(cinemaURL).then(res => res.json());
    
    const paths = await res.data.map((t : any)=>{
        return {params : {cinemaID : `${t.id}`}}
    })
    
    return {
        paths,
        fallback : false
    }
}

export const getStaticProps = async ({params} : {params : any})=>{
    const cinemaURL = process.env.NEXT_PUBLIC_CINEMA_URL as string;
    const cinemaData = await fetch(`${cinemaURL}/${params.cinemaID}`).then((res) => res.json())
    
    return {
        props : {
            cinemaData : cinemaData.data
        }
    }
}
import { useRouter } from 'next/router';
import React from 'react';

const Logo = () => {
    const router = useRouter();

    return (
        <span dir='rtl' onClick={()=>router.push('/')} 
         className='text-red-700 text-[30px] ring px-6 pt-1 cursor-pointer ring-red-700
        bg-white rounded-full shadow-lg shadow-red-800' >
         سینما TV
       </span>
    );
}

export default Logo;

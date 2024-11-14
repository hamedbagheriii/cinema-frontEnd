import FormikInput from '@/components/formik/input';
import { Input } from '@/components/ui/input';
import Logo from '@/utils/logo';
import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <div dir='rtl' className='top-0 left-0 w-full items-center flex justify-between h-16 bg-red-700'>
            <div className='flex items-center justify-start text-white  gap-12 w-8/12 lg:w-7/12'>
                <Link href={'/'} className=' text-[20px]  flex-nowrap ps-3'>سینما TV</Link>
                <Link href={'/movie'} >فیلم</Link>
                <Link href={'/cinema'} >سینما</Link>
                <Input className='max-w-56 hidden border-2 lg:flex placeholder:text-white' placeholder='جستجو' />
            </div>

            <div>
                aa
            </div>
        </div>
    );
}

export default Header;

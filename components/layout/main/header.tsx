import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToken } from '@/hooks/use-Token';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Sidebar from './sidebar';
import FullName from '@/utils/fullName';

const Header = () => {
  const { isUser } = useToken();
  const router = useRouter();
  const [isSidebar, setSidebar] = useState(false);

  const LinkStyle = `hover:bg-black/90 transition-all px-4 py-1
  rounded-full font-normal duration-200 text-white hidden sm:flex`;
  const buttonStyle = `bg-transparent border-2 border-black rounded-full hidden sm:flex`;

  return (
    <div
      dir='rtl'
      className='top-0 left-0 w-full text-white px-5 items-center flex justify-between h-16 bg-red-700'
    >
      {/* right side */}
      <div className='flex items-center justify-start gap-6 w-8/12 '>
        <Link href={'/'}
          className='w-fit text-[20px] border-l-2
        border-white/60 pl-5 text-nowrap ps-3'
        >
          سینما TV
        </Link>

        <Link href={'/movie'} className={LinkStyle}>
          فیلم
        </Link>

        <Link href={'/cinema'} className={LinkStyle}>
          سینما
        </Link>

        {/* serach input */}
        <Input
          className='max-w-56 hidden border-2 hover:border-black/60
          hover:shadow-black/50 lg:flex placeholder:text-white'
          placeholder='جستجو . . . '
        />
      </div>

      {/* left side */}
      <div className='w-full flex justify-end pe-4'>
        {/* dropdown */}
        <DropdownMenu>
          {isUser ? (
            <DropdownMenuTrigger className={`${buttonStyle} ${LinkStyle} border-white `}>
              حساب کاربری
            </DropdownMenuTrigger>
          ) : (
            <Button className={buttonStyle} onClick={() => router.push('/auth/login')}>
              ورود و ثبت نام
            </Button>
          )}

          <DropdownMenuContent className=' mt-4 text-center flex 
           bg-red-800 flex-col rounded-lg px-7 py-4 space-y-3'>
            <FullName isUser={isUser} />
            <hr />

            <Link href={'/movie'} className={LinkStyle + ' mx-auto flex px-10'}>
              داشبورد
            </Link>

            <hr />
            <Link href={'/cinema'} className={LinkStyle + ' mx-auto flex px-10'}>
              سینما
            </Link>

            <hr />
            <Link href={'/cinema'} className={LinkStyle + ' mx-auto flex px-10'}>
              خروج
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* sidebar icon */}
        <i className='bi bi-list text-center sm:hidden flex cursor-pointer'
          onClick={() => setSidebar(true)}
          style={{ fontSize: '1.5rem' }}
        ></i>
      </div>

      {/* sidebar */}
      <Sidebar isSidebar={isSidebar} setSidebar={setSidebar} isUser={isUser} />
    </div>
  );
};

export default Header;

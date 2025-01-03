import { Button } from '@/components/ui/button';
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
import LinkCompo, { handleCheckLink } from '@/components/LinkCompo';
import { ConfirmAlert } from '@/components/AlertCompo';
import { hasAccess } from '@/utils/hasAccess';
import AdminSidebar from '../dashboard/admin/AdminSidebar';
import { useAtom } from 'jotai';
import { TokenData } from '@/atoms/atoms';

const Header = () => {
  const [isUser] = useAtom(TokenData)
  const router = useRouter();
  const [isSidebar, setSidebar] = useState(false);

  // style for Link =>
  const LinkStyle = `hover:bg-black/80 transition-all px-4 py-1
  rounded-full font-normal duration-200 text-white hidden sm:flex`;
  const buttonStyle = `bg-transparent border-2 border-black rounded-full hidden sm:flex`;

  return (
    <div
      dir='rtl'
      className='top-0 z-50 left-0 sticky w-full text-white px-5 shadow-md
    shadow-black/50 items-center flex justify-between h-16 bg-red-700'
    >
      {/* right side */}
      <div className='flex items-center justify-start gap-4 w-8/12 '>
        <Link
          href={'/'}
          className='w-fit text-[20px] border-l-2
        border-white/60 pl-5 text-nowrap ps-3'
        >
          سینما TV
        </Link>

        <Link href={'/movie'} className={`${LinkStyle} w-24 justify-center`}>
          فیلم
        </Link>

        <Link href={'/cinema'} className={`${LinkStyle} w-24 justify-center`}>
          سینما
        </Link>
      </div>

      {/* left side */}
      <div className='w-4/12 flex justify-end pe-4'>
        {/* dropdown */}
        <DropdownMenu>
          {isUser ? (
            <DropdownMenuTrigger
              className={`${buttonStyle} ${LinkStyle} border-white items-center
            ${handleCheckLink('/dashboard', router)}`}
            >
              <i className='bi bi-person  me-2' style={{ fontSize: 20 }}></i>
              پروفایل
            </DropdownMenuTrigger>
          ) : (
            <Button className={buttonStyle} onClick={() => router.push('/auth/login')}>
              ورود و ثبت نام
            </Button>
          )}

          <DropdownMenuContent
            className=' mt-4 ms-5 text-center hidden sm:flex
           bg-red-800 flex-col rounded-lg w-60 px-4 py-4 space-y-3 '
          >
            <FullName isUser={isUser} icon={true} />
            <hr />

            {isUser && hasAccess('show', isUser.roles) === true ? (
              <LinkCompo
                title='داشبورد مدیریت'
                iconClass='person-gear me-2'
                linkClass='mt-2 pl-3'
                path={'/dashboard/admin'}
                dir='rtl'
              />
            ) : (
              <>
                <LinkCompo
                  title='اطالاعات کاربری'
                  iconClass='columns-gap me-2 mt-0.5'
                  linkClass={`rounded-full justify-center pb-2 pt-2 hover:bg-black/80 `}
                  path={'/dashboard/user/profile'}
                  dir='rtl'
                />

                <hr />
                <LinkCompo
                  title='بلیط ها'
                  iconClass='ticket-perforated me-2 pb-1'
                  linkClass={`rounded-full justify-center pb-1 pt-2 hover:bg-black/80 `}
                  path={'/dashboard/user/ticket'}
                  dir='rtl'
                />

                <hr />
                <LinkCompo
                  title='کیف پول'
                  iconClass='wallet2 me-2'
                  linkClass={`rounded-full justify-center pb-2 pt-2 hover:bg-black/80 `}
                  path={'/dashboard/user/wallet'}
                  dir='rtl'
                />
              </>
            )}
            <hr />
            <ConfirmAlert
              title='آیا میخواهد از حساب کاربری خارج شوید ؟'
              onClick={() => {
                router.push('/auth/logout');
              }}
            >
              <div
                dir='rtl'
                className='flex items-center px-2 
            transition-all duration-150 rounded-md
             font-normal justify-center pb-2 pt-2 hover:bg-black/80'
              >
                <i className='bi bi-box-arrow-right me-2 mt-0.5'></i>
                <span>خروج از حساب</span>
                <i className={`bi bi-caret-left mt-0.5 ms-auto`}></i>
              </div>
            </ConfirmAlert>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* sidebar icon */}
        <i
          className={`bi bi-list text-center sm:hidden flex cursor-pointer`}
          onClick={() => setSidebar(true)}
          style={{ fontSize: '1.5rem' }}
        ></i>
      </div>

      {/* sidebar */}
      {router.pathname.startsWith('/dashboard') && isUser &&
      hasAccess('show', isUser.roles) === true ? (
        <AdminSidebar isSidebar={isSidebar} setSidebar={setSidebar}  />
      ) : (
        <Sidebar isSidebar={isSidebar} setSidebar={setSidebar}  />
      )}
    </div>
  );
};

export default Header;

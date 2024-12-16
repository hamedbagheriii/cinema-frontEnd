import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useTicketService } from '@/services/ticket/ticket';
import { ConfirmAlert, handleShowAlert } from '@/components/AlertCompo';
import LinkCompo from '@/components/LinkCompo';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FC, ReactNode, useState } from 'react';
import { useStore } from 'jotai';
import { setToken } from '@/utils/setToken';

interface layoutProps {
  children: ReactNode;
  isTicket?: boolean;
}
const Layout: FC<layoutProps> = ({ children, isTicket = false }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [ticket, setTicket] = useState<number | null>(null);
  const store = useStore();


  // handle use ticket =>
  const onSubmit = async () => {
    if (ticket !== null) {
      setIsSubmiting(true);
      const res: any = await useTicketService(ticket);

      if (res.status === 200) {
        handleShowAlert('بلیط با موفقیت چاپ شد !', true, 'success', toast);
        setTimeout(() => {
          router.push('/dashboard/user/profile');
          setToken(store);
        }, 3000);
      } else {
        handleShowAlert(res.response.data.message || res.message, false, 'error', toast);
      }

      setTimeout(() => {
        setIsSubmiting(false);
      }, 3000);
    }
  };

  return (
    <div
      dir='rtl'
      className='flex flex-col mx-auto sm:flex-row w-full pt-6 xl:max-w-[80vw] px-2'
    >
      {/* sidebar */}
      <div className='w-full sm:w-4/12 pt-2'>
        <div
          className='bg-red-800 w-full me-auto sm:max-w-80 shadow-md h-fit
          shadow-black/50 rounded-2xl my-auto text-white gap-3 flex flex-col py-4 px-2'
        >
          <LinkCompo
            title='اطلاعات کاربری'
            iconClass='columns-gap me-2 mt-0.5'
            linkClass={`rounded-full justify-center pb-2 pt-2 hover:bg-black/80 `}
            path={'/dashboard/user/profile'}
            dir='rtl'
          />
          <hr />
          <LinkCompo
            title='بلیط ها'
            iconClass='ticket-perforated me-2 mt-0.5'
            linkClass={`rounded-full justify-center pb-2 pt-2 hover:bg-black/80 `}
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
          <hr />
          <ConfirmAlert
            title='آیا میخواهد از حساب کاربری خارج شوید ؟'
            onClick={() => {
              router.push('/auth/logout');
            }}
          >
            <div
              className='flex items-center px-2 
            transition-all duration-150 rounded-md
             font-normal justify-center pb-2 pt-2 hover:bg-black/80'
            >
              <i className='bi bi-box-arrow-right me-2 mt-0.5'></i>
              <span>خروج از حساب</span>
              <i className={`bi bi-caret-left mt-0.5 ms-auto`}></i>
            </div>
          </ConfirmAlert>
        </div>

        {/* ticket */}
        {isTicket && (
          <div
            className='bg-red-800 w-full me-auto mt-10 sm:max-w-80 shadow-md h-fit
          shadow-black/50 rounded-2xl my-auto text-white gap-3 flex flex-col py-4 px-2'
          >
            <span className='mx-auto flex font-normal'>
              <i className='bi bi-tag mt-0.5 me-2'></i>
              چاپ بلیط
            </span>
            <Input
              onChange={(e: any) => setTicket(e.target.value)}
              type='number'
              className='bg-white text-black'
              placeholder='مثال : 123456'
            />
            <Button
              onClick={() => onSubmit()}
              className='w-full bg-black hover:text-red-700
           hover:bg-black duration-150'
            >
              {isSubmiting ? <Loader2 className='size-5 animate-spin' /> : 'چاپ'}
            </Button>
            <small className='ps-1 font-normal text-wrap'>
              توجه : کاربر گرامی ، این یک نمونه تست است .
            </small>
          </div>
        )}
      </div>

      {/* content */}
      <div
        className='w-full mt-6 sm:mt-0 sm:w-9/12 pb-8 
       px-3 py-2 '
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;

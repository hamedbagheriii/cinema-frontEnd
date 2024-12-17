import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Custom404() {
  const router = useRouter();

  return (
    <div dir='rtl' className='w-full flex-col h-screen flex justify-center items-center'>
      <span className='text-black text-[70px] font-bold'>
        - <span className='text-red-700'>404</span> -
      </span>
      <span className='text-red-700 text-center text-[25px] font-bold '>
         متاسفانه صفحه ی مورد نظر وجود ندارد <span>!</span>
      </span>
      <Button
        onClick={() => router.push('/')}
        className='mt-10 bg-red-800 shadow-md shadow-red-900 hover:bg-red-900'
      >
        بازگشت به صفحه اصلی
      </Button>
    </div>
  );
}

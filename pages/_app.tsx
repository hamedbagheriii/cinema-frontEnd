import Footer from '@/components/layout/main/footer';
import Header from '@/components/layout/main/header';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import { localToken } from '@/utils/localToken';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    localToken()
  },[])

  return (
    <div className='w-full  sm:h-[650px]'>
      {!router.pathname.startsWith('/auth/') ? <Header/> : null}
      <Component {...pageProps} />
      <Toaster />
      {!router.pathname.startsWith('/auth/') &&
       !router.pathname.startsWith('/event/') &&
        !router.pathname.startsWith('/dashboard/') ? <Footer/> : null}
    </div>
  );
}

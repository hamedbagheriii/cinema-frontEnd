import Header from '@/components/layout/main/header';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <>
      {!router.pathname.startsWith('/auth/') ? <Header/> : null}
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

import { logoutUserService } from '@/services/auth/auth';
import { Cookies } from '@/services/service';
import PageLoading from '@/utils/pageLoading';
import { setToken } from '@/utils/setToken';
import { useStore } from 'jotai';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Logout = () => {
  const router = useRouter();
  const store = useStore();

  const hanleLogoutUser = async () => {
    const res = await logoutUserService();
    localStorage.removeItem('userToken');
    Cookies.remove('userToken');
    setToken(store);

    setTimeout(() => {
      router.push('/auth/login')
    }, 2000);
  };

  useEffect(() => {
    hanleLogoutUser();
  }, []);

  return <PageLoading title='درحال خروج از ' target='حساب کاربری' />;
};

export default Logout;

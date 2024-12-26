import { TokenData } from '@/atoms/atoms';
import { getUserDataService } from '@/services/auth/auth';
import { Cookies } from '@/services/service';

export const setToken = async (store : any) => {
  const res = await getUserDataService();
  
  if (res?.status === 200) {
    store.set(TokenData, res.data.data);
    
  } else {
    store.set(TokenData, null);
    localStorage.removeItem('userToken');
    Cookies.remove('userToken');
  }
};

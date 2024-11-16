import { useToast } from '@/hooks/use-toast';
import axios, { AxiosPromise } from 'axios';
import Cookie from 'universal-cookie';

// ! dependencies
export const Cookies = new Cookie(null, { path: '/' });
// ! dependencies

// ! interceptors =>>>
axios.interceptors.response.use(
  (res: any) => {
    if (!res.data.success) {
      console.log(res.data.message);
      return console.log(res.data.message);
    }

    return res;
  },
  (err: any) => {
    if (!err.request.responseURL.includes('/auth/user')) {
      console.log(err.response.data.message || err.message);

      return err;
    }
  }
);

// ! service =>>>
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

type ServiceProps = (url: string, method: string, data?: any) => AxiosPromise;
export const service: ServiceProps = async (url, method, data = null) => {
  return await axios({
    baseURL,
    url,
    method,
    data,
    headers: {
      'Content-Type': 'application/json',
      Authorization: (await Cookies.get('userToken')) || '',
    },
  });
};

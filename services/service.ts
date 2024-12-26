import axios, { AxiosPromise } from 'axios';
import Cookie from 'universal-cookie';

// ! dependencies
export const Cookies = new Cookie(null, { path: '/' });
// ! dependencies

// ! interceptors =>>>
axios.interceptors.response.use(
  (res: any) => {
    return res;
  },
  (err: any) => {
    return err;
  }
);

// ! service =>>>
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

type ServiceProps = (
  url: string,
  method: string,
  data?: any,
  type?: string
) => Promise<any>;
export const service: ServiceProps = async (
  url,
  method,
  data = null,
  type = 'application/json'
) => {
  return await axios({
    baseURL,
    url,
    method,
    data,
    headers: {
      'Content-Type': type,
      Authorization:
        (await Cookies.get('userToken')) || localStorage.getItem('userToken') || '',
    },
  });
};

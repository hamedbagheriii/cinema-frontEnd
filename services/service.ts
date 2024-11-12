import axios from 'axios';
import { error } from 'console';
import Cookie from 'universal-cookie';

// ! dependencies
export const Cookies = new Cookie();
// ! dependencies

// ! interceptors =>>>
axios.interceptors.response.use((res : any)=>{
  if (!res.data.success) {
    console.log(res.data.message);
    alert(res.data.message);
  }  

  return res;
},(err : any)=>{
  console.log(err);
  alert(err.response.data.message || err.message);
})



// ! service =>>>
type ServiceProps = (url: string, method: string, data?: any) => void;
export const service: ServiceProps = async (url, method, data = null) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  return await axios({
    baseURL,
    url,
    method,
    data,
    headers: {
      'Content-Type': 'application/json',
      Authorization: Cookies.get('token') || null,
    },
  });
};

import { baseURL, service } from '../service';

export const loginUserService = async (data: any) => {
  return await service('/auth/sign-in', 'post', data);
};

export const registerUserService = async (data: any) => {
  return await service('/auth/sign-up', 'post', data);
};

export const checkUserService = async (Cookie : any) => {
  const Token = await Cookie.get('userToken')?.value || ''

  return await fetch(`${baseURL}/auth/user`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: Token ,
    },
  }).then((res) => res.json());
};

export const getUserDataService = async () => {
  return await service('/auth/user', 'get');
};

export const updateUserService = async (data : any)=>{
  return service('/auth/update' , 'put' , data)
}

export const updatePassService = async (data : any)=>{
  return service('/auth/update/password' , 'put' , data)
}

export const logoutUserService = async ()=>{
  return service('/auth/logout' , 'get' )
}
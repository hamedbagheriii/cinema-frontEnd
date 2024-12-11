import { service } from '@/services/service';

export const getUsersService = async (id?: number) => {
  return await service(`/auth/users${id ? `/${id}` : ''}`, 'get');
};

export const deleteuserService = async (id: number, data: any) => {
  return await service(`/auth/users/del/${id}`, 'delete', data);
};

export const addUserService = async (values: any) => {
  return await service(`/auth/users/add`, 'post', values);
};

export const editUserService = async (values: any) => {
  return await service(`/auth/users/update`, 'put', values);
};

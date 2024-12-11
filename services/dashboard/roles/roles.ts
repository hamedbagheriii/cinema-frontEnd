import { service } from '@/services/service';

export const getRolesService = async () => {
  return await service(`/roles`, 'get');
};

export const deleteRoleService = async (id: number) => {
  return await service(`/roles/delete/${id}`, 'delete');
};

export const addRoleService = async (values: any) => {
  return await service(`/roles/add`, 'post', values);
};

export const editRoleService = async (values: any, id: number) => {
  return await service(`/roles/edit/${id}`, 'put', values);
};

// ! ======================== permissions ========================
export const addAllPermsService = async () => {
  return await service(`/roles/perm/addAll`, 'get');
};

export const getPermService = async () => {
  return await service(`/roles/perm`, 'get');
};
import { service } from '@/services/service';

export const getWalletsService = async (id?: number) => {
  return await service(`/wallet/all/${id ? `/${id}` : ''}`, 'get');
};

export const editWalletService = async (values: any) => {
  return await service(`/wallet/user/update`, 'put', values);
};

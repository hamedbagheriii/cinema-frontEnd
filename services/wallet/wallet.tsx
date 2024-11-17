import { service } from "../service";

export const incWalletService = async (data: any) => {
  return service('/wallet/user/increment', 'put', data);
};

import { service } from "../service";

export const getIncomeService = async ()=>{
    return await service('/ticket/getIncome', 'get');
};
  
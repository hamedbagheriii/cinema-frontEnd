import { service } from "@/services/service";

export const getCinemasService = async ()=>{
    return await service('/cinema', 'get');
};
  

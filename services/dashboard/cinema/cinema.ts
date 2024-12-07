import { service } from "@/services/service";

export const getCinemasService = async ()=>{
    return await service('/cinema', 'get');
};
  
export const deleteCinemaService = async (id : number)=>{
    return await service(`/cinema/${id}`, 'delete');
};
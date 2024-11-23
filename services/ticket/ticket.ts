import { service } from "../service";

export const addTicketService = async (data : any)=>{
    return await service('/ticket/add', 'post',data);
};
  
export const useTicketService = async (ticket : number)=>{
    return await service(`/ticket/up-useTicket/${ticket}`, 'get');
};
  
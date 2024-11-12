import { service } from "../service"


export const loginUserService = async (data : any)=>{
    return await service('/auth/sign-in', 'post', data);
}
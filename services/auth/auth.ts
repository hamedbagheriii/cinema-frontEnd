import { service } from "../service"


export const loginUserService = async (data : any)=>{
    return await service('/auth/sign-in', 'post', data);
}

export const registerUserService = async (data : any)=>{
    return await service('/auth/sign-up', 'post', data);
}
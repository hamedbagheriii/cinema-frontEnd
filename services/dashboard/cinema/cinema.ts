import { service } from "@/services/service";

export const getCinemasService = async ()=>{
    return await service('/cinema', 'get');
};
  
export const deleteCinemaService = async (id : number)=>{
    return await service(`/cinema/${id}`, 'delete');
};

export const addCinemaService = async (values : any)=>{
    return await service(`/cinema/add`, 'post', values , 'multipart/form-data');
};

export const editCinemaService = async (values : any , id : number)=>{
    return await service(`/cinema/edit/${id}`, 'put', values , 'multipart/form-data');
};


// !  =================================== Hall ===================================

// export const deleteCinemaService = async (id : number)=>{
//     return await service(`/cinema/${id}`, 'delete');
// };

export const addHallService = async (values : any)=>{
    return await service(`/cinema/halls/add`, 'post', values );
};

// export const editCinemaService = async (values : any , id : number)=>{
//     return await service(`/cinema/edit/${id}`, 'put', values , 'multipart/form-data');
// };
import { service } from '@/services/service';

export const getCinemasService = async (id ?: number) => {
  return await service(`/cinema${id ? `/${id}` : ''}`, 'get');
};

export const deleteCinemaService = async (id: number) => {
  return await service(`/cinema/${id}`, 'delete');
};

export const addCinemaService = async (values: any) => {
  return await service(`/cinema/add`, 'post', values, 'multipart/form-data');
};

export const editCinemaService = async (values: any, id: number) => {
  return await service(`/cinema/edit/${id}`, 'put', values, 'multipart/form-data');
};

export const addMovieCinemaService = async (values: any, id: number) => {
    return await service(`/cinema/UPMovies/${id}`, 'put', values, );
  };
  
// !  =================================== Hall ===================================

export const addHallService = async (values: any) => {
  return await service(`/cinema/halls/add`, 'post', values);
};

export const deleteHallService = async (id: number) => {
  return await service(`/cinema/halls/delete/${id}`, 'delete');
};

export const editHallService = async (values : any , id : number)=>{
    return await service(`/cinema/halls/edit/${id}`, 'put', values ,);
};

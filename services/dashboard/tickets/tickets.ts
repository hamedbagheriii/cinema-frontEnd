import { service } from '@/services/service';

export const getAllTicketService = async () => {
  return await service('/ticket/all', 'get');
};

export const deleteTicketService = async (id: number) => {
  return await service(`/ticket/del/${id}`, 'delete');
};

// export const addMovieService = async (values: any) => {
//   return await service(`/movie/add`, 'post', values, 'multipart/form-data');
// };

// export const editMovieService = async (values: any, id: number) => {
//   return await service(`/movie/edit/${id}`, 'put', values, 'multipart/form-data');
// };

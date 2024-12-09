import { service } from '@/services/service';

export const getMovieService = async () => {
  return await service('/movie', 'get');
};

export const deleteMovieService = async (id: number) => {
  return await service(`/movie/delete/${id}`, 'delete');
};

export const addMovieService = async (values: any) => {
  return await service(`/movie/add`, 'post', values, 'multipart/form-data');
};

// export const editMovieService = async (values: any, id: number) => {
//   return await service(`/movie/edit/${id}`, 'put', values, 'multipart/form-data');
// };

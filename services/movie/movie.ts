import { service } from "../service";

export const getMovieService = async ()=>{
    return await service('/movie', 'get');
};
  
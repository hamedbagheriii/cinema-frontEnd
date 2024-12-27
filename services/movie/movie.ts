import { service } from '../service';

export const getMovieService = async (id?: number) => {
  return await service(`/movie${id ? `/${id}` : ''}`, 'get');
};

export const getReservedSeatsService = async (
  movie: number,
  cinema: number,
  hall: number,
  date: string,
  time: string
) => {
  return await service(
    `/movie/resarvedSeats/${movie}/${cinema}/${hall}/${date}/${time}`,
    'get'
  );
};

export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';

export const getMovies = movies => ({
  type: GET_MOVIES_SUCCESS,
  movies,
});

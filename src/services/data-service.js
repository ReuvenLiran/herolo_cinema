
// 			.get('data/todo-data.json')
// 			.end((err, res) => {
// 				if (err) {
// 					return next({
// 						type: 'GET_TODO_DATA_ERROR',
// 						err
// 					})
// 				}
// 				const data = JSON.parse(res.text)
// 				next({
// 					type: GET_MOVIES_SUCCESS,
// 					data
// 				})
// 			})import { GET_MOVIES } from '../actions';
import {
	getDirectors as getDirectorsAPI,
	getMovies as getMoviesAPI,
	getGenres as getGenresAPI,
	getMoviesRuntime as getMoviesRuntimeAPI,
} from './servies';

import { 
	GET_MOVIES,
	GET_MOVIES_SUCCESS,
	getMovies as getMoviesAction,
	getGenres as getGenresAction, 
	GET_GENRES,
	initalizeMovies,
} from 'actions';

const dataService = store => next => async action => {
	next(action)
	console.log(action.type);
	switch (action.type) {

	case GET_GENRES: {
		const generes = await getGenresAPI();
		next(getGenresAction(generes));
		break;
	}
	case GET_MOVIES: {
		try {
			const movies = await getMoviesAPI();
			const moviesIds = movies.map(m => m.id);
			const directors = await getDirectorsAPI(moviesIds);
			const runtimes = await getMoviesRuntimeAPI(moviesIds);
			
			const moviesWithDirectors = movies.map(movie => ({
				...movie,
				runtime: runtimes[movie.id],
				director: directors[movie.id],
			}));
			next(getMoviesAction(moviesWithDirectors));
			const editeMovies = moviesWithDirectors.reduce((total, movie) => {
				const { id, director, year, runtime, title, genreIds } = movie;
				total.set(id, {
					director,
					year,
					runtime,
					title,
					genreIds,
				});
				return total;
			}, new Map());
			console.log({editeMovies})
			next(initalizeMovies(editeMovies));
			
		} catch (e) {
			console.error(e);
		}
		break;
	}
	// case GET_MOVIES_SUCCESS: {
	// 	console.log(GET_MOVIES_SUCCESS);
	// 	const { movies } = store.getState();
	// 	const editeMovies = movies.reduce((movie, total) => {
	// 		const { id, ...data } = movie;
	// 		total.add(id, data);
	// 	}, new Map());
	// 	next(initalizeMovies(editeMovies));
	// 	break;
	// }
	default:
		break
	}
};

export default dataService;

// request
// 			.get('data/todo-data.json')
// 			.end((err, res) => {
// 				if (err) {
// 					return next({
// 						type: 'GET_TODO_DATA_ERROR',
// 						err
// 					})
// 				}
// 				const data = JSON.parse(res.text)
// 				next({
// 					type: GET_MOVIES_SUCCESS,
// 					data
// 				})
// 			})
// action types
import {
    FETCH_FILM_SUCCESS,
    FETCH_FILM_BEGIN,
    FETCH_FILM_FAILURE,
} from './film.actions';
// action creators
import {
    fetchFilmSuccessAction,
    fetchFilmBeginAction,
    fetchFilmFailureAction,
} from './film.actions';
// reducer
import { filmReducer } from './film.reducer';

describe('actions', () => {
    it('should create an action to begin fetching film', () => {
        const expectedAction = {
            type: FETCH_FILM_BEGIN,
        };
        expect(fetchFilmBeginAction()).toEqual(expectedAction);
    });
    it('should create an action to add a todo', () => {
        const data = { film: 'hajen' };
        const expectedAction = {
            type: FETCH_FILM_SUCCESS,
            data,
        };
        expect(fetchFilmSuccessAction(data)).toEqual(expectedAction);
    });
    it('should create an action fail film fetching', () => {
        const error = { error: 'hoppsan' };
        const expectedAction = {
            type: FETCH_FILM_FAILURE,
            error,
        };
        expect(fetchFilmFailureAction(error)).toEqual(expectedAction);
    });
});

describe('reducer', () => {
    it('should return data when successful', () => {
        const data = { film: 'hajen' };
        const action = {
            type: FETCH_FILM_SUCCESS,
            data,
        };
        const expectedResult = { loading: false, filmData: data };
        expect(filmReducer(null, action)).toEqual(expectedResult);
    });

    it('should set loading when fetch film starts', () => {
        const action = {
            type: FETCH_FILM_BEGIN,
        };
        const expectedResult = { loading: true };
        expect(filmReducer(null, action)).toEqual(expectedResult);
    });

    it('should set loading:false when fetch film fails', () => {
        const error = { error: 'hoppsan' };
        const action = {
            type: FETCH_FILM_FAILURE,
            error,
        };
        const expectedResult = { loading: false, error };
        expect(filmReducer(null, action)).toEqual(expectedResult);
    });
});

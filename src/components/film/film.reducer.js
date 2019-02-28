import {
    FETCH_FILM_BEGIN,
    FETCH_FILM_SUCCESS,
    FETCH_FILM_FAILURE,
} from './film.actions';

const initialState = {
    loading: false,
    filmData: null,
};

export const filmReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FILM_BEGIN:
            return {
                ...state,
                loading: true,
            };
        case FETCH_FILM_SUCCESS:
            return {
                ...state,
                loading: false,
                filmData: action.data,
            };
        case FETCH_FILM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

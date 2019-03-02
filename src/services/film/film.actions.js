export const FETCH_FILM_BEGIN = 'FETCH_FILM_BEGIN';
export const FETCH_FILM_SUCCESS = 'FETCH_FILM_SUCCESS';
export const FETCH_FILM_FAILURE = 'FETCH_FILM_FAILURE';

export function fetchFilmBeginAction() {
    return { type: FETCH_FILM_BEGIN };
}

export function fetchFilmSuccessAction(res) {
    return { type: FETCH_FILM_SUCCESS, data: res };
}

export function fetchFilmFailureAction(error) {
    return { type: FETCH_FILM_FAILURE, error };
}

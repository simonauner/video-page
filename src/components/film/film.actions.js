export const FETCH_FILM_BEGIN = 'FETCH_FILM_BEGIN';
export const FETCH_FILM_SUCCESS = 'FETCH_FILM_SUCCESS';

export function fetchFilmBeginAction() {
    return { type: FETCH_FILM_BEGIN };
}

export function fetchFilmSuccessAction(res) {
    return { type: FETCH_FILM_SUCCESS, data: res };
}

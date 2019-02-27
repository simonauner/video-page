export const FETCH_FILM_BEGIN = 'FETCH_FILM_BEGIN';
export const FETCH_FILM_SUCCESS = 'FETCH_FILM_SUCCESS';

export function getFilm(filmId) {
    return function(dispatch) {
        dispatch({ type: FETCH_FILM_BEGIN });
        fetch(`/api/content/${filmId}`)
            .then(res => res.json())
            .then(res => {
                dispatch({ type: FETCH_FILM_SUCCESS, data: res });
            });
    };
}

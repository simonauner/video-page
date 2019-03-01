import request from 'request-promise-native';
import { Cache } from './cache';

const cache = new Cache(60 * 5); // 5 minutes cache. Totally arbitrary!

const makeRequest = function(contentId) {
    let returnObj;
    const apiKey = '9a13a00bbccc51b86bef4554b33a8af1';

    return request(`https://content.viaplay.se/pc-se/film/${contentId}`, {
        json: true,
    })
        .then(response => {
            returnObj =
                response._embedded['viaplay:blocks'][0]._embedded[
                    'viaplay:product'
                ];

            return returnObj;
        })
        .then(res => {
            const imdbId = res.content.imdb.id;
            return request(
                `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id&language=en-US&api_key=${apiKey}`,
                { json: true }
            );
        })
        .then(res => {
            // if no movies are found with matching id in the movie db
            if (!res.movie_results.length) {
                return returnObj;
            }

            const movieId = res.movie_results[0].id;

            return request(
                `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
                { json: true }
            )
                .then(res => {
                    if (res.results.length) {
                        const video = res.results[0];
                        if (
                            video.site.toLowerCase() === 'youtube' &&
                            video.type.toLowerCase() === 'trailer'
                        ) {
                            returnObj.trailer = `https://www.youtube.com/embed/${
                                video.key
                            }?autoplay=1&modestbranding=1`;
                        }
                    }
                    return returnObj;
                })
                .catch(err => {
                    console.log(err);
                });
        });
};

export const getContent = function(contentId) {
    return cache.get(`getContentById_${contentId}`, () => {
        return makeRequest(contentId);
    });
};

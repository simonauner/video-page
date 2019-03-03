import request from 'request-promise-native';
import Film from '../src/components/film/film.component';

// this could probably be done nicer if "fetch" ever lands in node.
// But for now I want to keep SSR routes table and browser routes table separated,
// otherwise node_modules/request is bundled out to the browser
export const routes = [
    {
        path: '/films/:filmId',
        exact: true,
        component: Film,
        ssrData: params => {
            return request(
                `http://localhost:8080/api/content/${params.filmId}`,
                {
                    json: true,
                }
            ).catch(err => {
                // eslint-disable-next-line no-console
                console.log(err);
            });
        },
    },
];

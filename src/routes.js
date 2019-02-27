import Film from './components/film/film.component';
import Films from './components/films/films.component';
import { Home } from './components/home/home.component';

export default [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/films',
        component: Films,
        exact: true,
    },
    {
        path: '/films/:filmId',
        component: Film,
        exact: true,
    },
];

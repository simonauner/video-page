// React
import React from 'react';
import render from 'preact-render-to-string';

// Redux
import { Provider as ReduxProvider } from 'preact-redux';
import createStore from '../src/store';

// Router
import { StaticRouter, matchPath } from 'react-router';

// Components
import { App } from '../src/components/app/app.component';

// data pre-requisites
import { routes } from './ssr-initial-data-routes';
import { fetchFilmSuccessAction } from '../src/services/film/film.actions';

export function generateInitialReactRedux({ url }) {
    const store = createStore({});

    // find out what to put in store for this URL
    const dataPromises = routes
        .filter(route => route.ssrData)
        .filter(route => {
            const match = matchPath(url, route);
            if (match) {
                route.params = match.params;
                return route;
            }
        })
        .map(route => {
            // fetch data for SSR, then dispatch action with the result
            return route.ssrData(route.params).then(res => {
                return store.dispatch(fetchFilmSuccessAction(res));
            });
        });

    return Promise.all(dataPromises).then(() => {
        const htmlString = render(
            <ReduxProvider store={store}>
                <StaticRouter location={url} context={{}}>
                    <App />
                </StaticRouter>
            </ReduxProvider>
        );

        return {
            htmlString,
            reduxState: store.getState(),
        };
    });
}

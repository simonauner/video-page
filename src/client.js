// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider as ReduxProvider } from 'react-redux';
import createStore from './store';

// Router
import { BrowserRouter } from 'react-router-dom';

// Components
import { App } from './components/app/app.component';

const store = createStore({});

const app = document.getElementById('app');
ReactDOM.hydrate(
    <ReduxProvider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ReduxProvider>,
    app
);

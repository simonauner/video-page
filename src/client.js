// React
import React from 'preact-compat';
import ReactDOM from 'preact-compat';

// Redux
import { Provider as ReduxProvider } from 'preact-redux';
import createStore from './store';

// Router
import { BrowserRouter } from 'react-router-dom';

// Components
import { App } from './components/app/app.component';

const store = createStore(window.INITIAL_STATE || {});

const app = document.getElementById('app');
ReactDOM.render(
    <ReduxProvider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ReduxProvider>,
    app
);

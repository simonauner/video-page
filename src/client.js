import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app/app.component';
import { BrowserRouter } from 'react-router-dom';

const app = document.getElementById('app');
ReactDOM.hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    app
);

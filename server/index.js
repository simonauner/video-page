import express from 'express';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { App } from '../src/components/app/app.component';

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/*', (req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const context = {};
    const reactDom = renderToString(
        <StaticRouter context={context} location={req.url}>
            <App />
        </StaticRouter>
    );
    res.end(html(reactDom));
});

app.listen(8080);

function html(content = '') {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Video page</title>
        </head>
        
        <body>
            <div id="app">${content}</div>
            <script src="./client.js"></script>
        </body>
        </html>
    `;
}

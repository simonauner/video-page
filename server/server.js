// Server
import express from 'express';
import compression from 'compression';

// utils
import path from 'path';

// Routes
import apiRoutes from './api';

// this is a patch to be able to use preact in react's place outside of bundlers.
// with this one the react API is served to other modules through preact-compat
// IMPORTANT to add this before anything that imports 'react'-dependent libs
import './patch-preact';

// SSR
import { generateInitialReactRedux } from './ssr';

const env = process.env.NODE_ENV;

const app = express();
let server;

export function startServer(callback) {
    const port = 8080;
    server = app.listen(port, 'localhost', () => {
        if (env !== 'test') {
            // eslint-disable-next-line no-console
            console.log(
                `Server is now listening at http://${
                    server.address().address
                }:${server.address().port}`
            );
        }
        if (typeof callback === 'function') {
            callback();
        }
    });
}
export function stopServer(callback) {
    server.close(callback);
}

app.disable('x-powered-by');

app.use(compression());

// serve all static files from build folder
app.use(express.static(path.resolve(__dirname, '../dist')));

// add api routes
app.use('/api', apiRoutes);

// for anything else, serve the web page and boot react
app.get('/*', (req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' });

    // compute what is needed for this URL request (if anything), before sending a response
    generateInitialReactRedux({
        url: req.url,
    }).then(({ htmlString, reduxState }) => {
        res.end(html(htmlString, reduxState));
    });
});

function html(htmlString = '', reduxState = {}) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Video page</title>

            <link href="https://mrgreentech.github.io/pam/kss-assets/css/pam.css" rel="stylesheet">
            <link href="/app.css" rel="stylesheet">
        </head>
        
        <body>
            <div id="app">${htmlString}</div>
            <script>
                window.INITIAL_STATE = ${JSON.stringify(reduxState)};
            </script>
            <script src="/client.js" async></script>

        </body>
        </html>
    `;
}

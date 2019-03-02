// Server
import express from 'express';
import compression from 'compression';

// utils
import path from 'path';

// Routes
import apiRoutes from './api';

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
        callback();
    });
}
export function stopServer(callback) {
    server.close(callback);
}

app.disable('x-powered-by');

app.use(compression());

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/api', apiRoutes);

app.get('/*', (req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(html());
});

function html() {
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
            <div id="app"></div>
            <script src="/client.js" async></script>

        </body>
        </html>
    `;
}

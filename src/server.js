// Server
import express from 'express';
import path from 'path';
import compression from 'compression';

// Routes
import apiRoutes from '../api';

const app = express();

app.disable('x-powered-by');

app.use(compression());

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/api', apiRoutes);

app.get('/*', (req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(html());
});

app.listen(8080);

function html() {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Video page</title>
        </head>
        
        <body>
            <div id="app"></div>
            <script src="/client.js"></script>

            <link href="https://mrgreentech.github.io/pam/kss-assets/css/pam.css" rel="stylesheet">
            <link href="/app.css" rel="stylesheet">
        </body>
        </html>
    `;
}

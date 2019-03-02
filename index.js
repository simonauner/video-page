require('@babel/register')();

const server = require('./server/server.js');
server.startServer(msg => {
    // eslint-disable-next-line no-console
    console.log(msg);
});

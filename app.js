//Imports
const http = require('http');
const express = require('express');
const ws = require('ws');

const routes = require('./server/routes');
const api = require('./server/api');

//Port settings
const webPort = 5000;

//Setup the web and websocket servers
const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server: server });

//Expose the public folder
app.use(express.static('public'));

//Bring in the routes
app.use('/', routes);

//Set up the websocket listener
wss.on('connection', (ws) => {
    console.log('Connection Established:');
    console.log(ws.upgradeReq.headers);
    console.log('\n');

    ws.on('message', (raw) => {
        console.log('received: %s\n', raw);
        const message = JSON.parse(raw);
        let args = message.args || [];
        api[message.call](ws, ...args);
    });

    ws.on('close', (status, clientMsg) => {
        api.unregisterConnection(ws);
        console.log(`Client disconnected (${status}) with message: ${clientMsg}\n`);
    });
});

//Start the server
server.listen(process.env.PORT || webPort, () => {
    console.log("Listening on %j\n", server.address());
});
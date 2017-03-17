import express from 'express'
import path from 'path'
import morgan from 'morgan'
import SERVER_CONFIG from './server/config';
import bodyParser from 'body-parser'

var WebSocketServer = new require('ws');

// подключенные клиенты
var clients = {};


import channelRoute from './server/routes/channel';

var app = express();
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use(morgan('tiny'));
//
app.use(express.static(path.join(__dirname, "./")));

var webSocketServer = new WebSocketServer.Server({
    port: SERVER_CONFIG.port
});

webSocketServer.on('connection', function(ws) {

    var id = Math.random();
    clients[id] = ws;
    console.log("новое соединение " + id);

    ws.on('message', function(message) {
        console.log('получено сообщение ' + message);

        for (var key in clients) {
            clients[key].send(message);
        }
    });

    ws.on('close', function() {
        console.log('соединение закрыто ' + id);
        delete clients[id];
    });

});

app.listen(SERVER_CONFIG.port, (err) => {
    if (err) throw err;

    console.log(`listening on port ${SERVER_CONFIG.port}`);
})

// app.use('/api', channelRoute);


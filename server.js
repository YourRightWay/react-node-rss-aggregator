import express from 'express'
import path from 'path'
import morgan from 'morgan'
import SERVER_CONFIG from './server/config';
import bodyParser from 'body-parser'

import channelRoute from './server/routes/channel';

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, "./")));

app.listen(SERVER_CONFIG.port, (err) => {
    if (err) throw err;

    console.log(`listening on port ${SERVER_CONFIG.port}`);
})

app.use('/api', channelRoute);


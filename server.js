import express from 'express';
import mongoose from 'mongoose';
require('dotenv').config({ silent: true });
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

const config = require('./config/main').default;
const socketController = require('./controllers/socket/index').default;

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
    useMongoClient: true
})
.then(() => {
    console.log('Mongoose default connection is open to ' + config.database);
})
.catch((error) => {
    console.log('error connecting to db: ' + error);
});

let runningApp = server.listen(config.port, err => {
    if (err) {
        return console.error(err);
    }
    console.log('The server is listening on port %s', config.port);
});

socketController(io);

module.exports = {
    server: runningApp
};
import express from 'express';
import mongoose from 'mongoose';
require('dotenv').config({ silent: true });
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

const config = require('./config/main').default;
const stockController = require('./controllers/stock/index').default;

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

let appStart = server.listen(config.port, err => {
    if (err) {
        return console.error(err);
    }

    console.log('The server is listening on port %s', config.port);
});

io.on('connection', (socket) => {
    console.log('a user connected');

    //send data to client
    stockController.getStocks((err, stocks) => {
        if (err) {
            socket.emit('socketError', err.message);
        }
        socket.emit('getStocks', stocks);
    });

    //get data from client
    socket.on('addStock', (code) => {
        stockController.addStock(code, (err, context) => {
            if (err) {
                socket.emit('socketError', err.message);
            }
            else {
                io.emit('added', context.newStock);
            }
        });
    });

    //get data from client
    socket.on('deleteStock', (stockId) => {
        stockController.deleteStock(stockId, (err, context) => {
            if (err) {
                socket.emit('socketError', err.message);
            }
            else {
                socket.broadcast.emit('deleted', context.oldStock);
            }
        });
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    })
});

module.exports = {
    server: appStart
};
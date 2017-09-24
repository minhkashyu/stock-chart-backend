import getStocks from './getStocks';
import addStock from './addStock';
import deleteStock from './deleteStock';
import googleController from './../google/index';

export default (io) => {
    googleController.loadStockFiles();

    io.on('connection', (socket) => {
        console.log('a user connected');

        // send stocks to client
        getStocks(socket);

        // get 'addStock' event from client
        addStock(io, socket);

        // get 'deleteStock' event from client
        deleteStock(socket);

        socket.on('disconnect', () => {
            console.log('a user disconnected');
        })
    });
};
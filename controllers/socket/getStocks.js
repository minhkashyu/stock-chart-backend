import stockController from './../stock/index';

export default (socket) => {
    stockController.getStocks((err, stocks) => {
        if (err) {
            socket.emit('socketError', err.message);
        }
        socket.emit('getStocks', stocks);
    });
}
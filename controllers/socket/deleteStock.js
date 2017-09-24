import stockController from './../stock/index';

export default (socket) => {
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
};
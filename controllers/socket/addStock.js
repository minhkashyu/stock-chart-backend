import stockController from './../stock/index';

export default (io, socket) => {
    socket.on('addStock', (code) => {
        stockController.addStock(code, (err, context) => {
            if (err) {
                socket.emit('socketError', err.message);
            }
            else {
                io.emit('added', {
                    newStock: context.newStock,
                    chartData: context.chartData
                });
            }
        });
    });
};
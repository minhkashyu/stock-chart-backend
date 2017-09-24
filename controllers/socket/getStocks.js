import stockController from './../stock/index';

export default (socket) => {
    stockController.getStocks((err, context) => {
        if (err) {
            socket.emit('socketError', err.message);
        }
        socket.emit('getStocks', {
            stocks: context.stocks,
            chartData: context.chartData
        });
    });
}
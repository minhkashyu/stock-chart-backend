import Stock from './../../models/stock';

export default {
    getStocks: (context, callback) => {
        Stock.find({})
            .exec((err, stocks) => {
                if (err) {
                    return callback({
                        message: 'Cannot get all stocks'
                    });
                }
                context.stocks = stocks;
                callback(null, context);
            });
    }
};
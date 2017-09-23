import async from 'async';
import Stock from './../../models/stock';

const validateContext = (context, callback) => {
    if (!context.code) {
        return callback({
            message: 'Stock code cannot be empty.'
        })
    }
    callback(null, context);
};

const addStock = (context, callback) => {
    const stock = new Stock({
        code: context.code,
        name: context.code + ' Prices, Dividends, Splits and Trading Volume'
    });

    stock.save((err, newStock) => {
        if (err) {
            return callback({
                message: 'Cannot add new stock to the database'
            })
        }
        context.newStock = newStock;
        callback(null, context);
    });
};

export default (code, callback) => {
    async.waterfall([
        async.constant({
            code
        }),
        validateContext,
        addStock
    ], callback);
};
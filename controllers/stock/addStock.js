import async from 'async';
import Stock from './../../models/stock';
import googleController from './../google/index';

const validateContext = (context, callback) => {
    if (!context.symbol) {
        return callback({
            message: 'Ticker symbol cannot be empty.'
        })
    }
    callback(null, context);
};

const addStock = (context, callback) => {
    const stock = new Stock({
        symbol: context.symbol,
        name: context.name
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

const checkSymbol = (context, callback) => {
    Stock.findOne({ symbol: context.symbol })
        .exec((err, stock) => {
            if (err) {
                return callback({
                    message: 'Cannot add new stock to the database'
                });
            }
            if (stock) {
                return callback({
                    message: `Ticket symbol ${context.symbol} is already added.`
                });
            }
            callback(null, context);
        });
};

export default (symbol, callback) => {
    async.waterfall([
        async.constant({
            symbol
        }),
        validateContext,
        googleController.getSymbol,
        checkSymbol,
        addStock
    ], callback);
};
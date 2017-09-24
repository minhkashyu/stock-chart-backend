import async from 'async';
import Stock from './../../models/stock';

const validateContext = (context, callback) => {
    if (!context.stockId) {
        return callback({
            message: 'Stock ID is needed.'
        });
    }
    callback(null, context);
};

const deleteStock = (context, callback) => {
    let stockId = context.stockId;
    Stock.findOne({ _id: stockId })
        .exec((err, stock) => {
            if (err) {
                return callback({
                    message: `Stock with ID ${stockId} cannot be found.`
                });
            }

            let oldStock = stock;
            stock.remove(err => {
                if (err) {
                    return callback({
                        message: `Cannot delete stock with ID ${stockId}.`
                    });
                }
                context.oldStock = oldStock;
                callback(null, context);
            });
        });
};

export default (stockId, callback) => {
    async.waterfall([
        async.constant({
            stockId
        }),
        validateContext,
        deleteStock
    ], callback);
};
import async from 'async';
import Stock from './../../models/stock';
import googleController from './../google/index';
import _ from 'lodash';

const getStocks = (callback) => {
    Stock.find({})
        .sort('symbol')
        .exec((err, stocks) => {
            if (err) {
                return callback({
                    message: 'Cannot get all stocks.'
                });
            }
            callback(null, { stocks });
        });
};

const getSymbols = (context, callback) => {
    context.symbols = _.map(context.stocks, 'symbol');
    callback(null, context);
};

export default (callback) => {
    async.waterfall([
        getStocks,
        getSymbols,
        googleController.getStockData
    ], callback);
};
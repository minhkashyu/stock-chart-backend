import stockSymbolLookup from 'stock-symbol-lookup';
import _ from 'lodash';

export default (context, callback) => {
    let input  = context.symbol.toUpperCase();
    let maxEntries = 10;

    stockSymbolLookup.searchBySymbol(input, maxEntries)
        .then((symbols) => {
            if (symbols.length < 1) {
                return callback({
                    message: `The ticker symbol ${context.symbol} does not exist in the stock list.`
                });
            }
            let obj = _.find(symbols, { 'symbol': input });
            if (!obj) {
                return callback({
                    message: `The ticker symbol ${context.symbol} does not exist in the stock list.`
                });
            }
            context.symbol = obj.symbol;
            context.name = obj.securityName;
            callback(null, context);
        });
};
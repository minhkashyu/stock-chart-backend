import stockSymbolLookup from 'stock-symbol-lookup';

export default (context, callback) => {
    let input  = context.symbol;
    let maxEntries = 1;

    stockSymbolLookup.searchBySymbol(input, maxEntries)
        .then((symbols) => {
            if (symbols.length < 1) {
                return callback({
                    message: `The ticker symbol ${context.symbol} does not exist in the stock list.`
                });
            }
            context.symbol = symbols[0].symbol;
            context.name = symbols[0].securityName;
            callback(null, context);
        });
};
import stockSymbolLookup from 'stock-symbol-lookup';

export default (context, callback) => {
    stockSymbolLookup.loadData()
        .then((data) => {
            if (!data) {
                return callback({
                    message: 'Error when getting stock data files.'
                });
            }
        });
};
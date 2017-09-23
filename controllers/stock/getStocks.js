import Stock from './../../models/stock';

export default callback => {
    Stock.find({})
        .exec((err, stocks) => {
            if (err) {
                return callback({
                    message: 'Cannot get all stocks'
                });
            }
            callback(null, stocks);
        });
};
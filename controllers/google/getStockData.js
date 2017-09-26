import googleFinance from 'google-finance';
import moment from 'moment';
import _ from 'lodash';

export default (context, callback) => {
    let TO = moment().format('YYYY-MM-DD');
    let FROM = moment().subtract(1, 'years').format('YYYY-MM-DD');

    googleFinance.historical({
        symbols: context.symbols,
        from: FROM,
        to: TO
    }, (err, result) => {
        if (err) {
            return callback({
                message: 'Error when getting google-finance historical data.'
            });
        }
        let chartData = [];
        _.forEach(result, (quotes, symbol) => {
            let subData = _.reduce(quotes, (result, obj) => {
                result[obj.date] = obj.close;
                return result;
            }, {});
            chartData.push({
                name: symbol,
                data: subData
            });
        });
        context.chartData = chartData;
        callback(null, context);
    });
};
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StockSchema = new Schema(
    {
        symbol: {
            type: String,
            unique : true,
            required : true,
            dropDups: true
        },
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Stock', StockSchema);
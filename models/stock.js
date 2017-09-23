import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StockSchema = new Schema(
    {
        code: {
            type: String,
            required: true
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
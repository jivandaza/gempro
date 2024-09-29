import mongoose, {Schema} from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    margin: {
        type: Number,
        required: true
    },
    unitValue: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    material: {
        type: Schema.Types.ObjectId,
        ref: 'material',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('product', productSchema);
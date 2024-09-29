import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model('material', materialSchema);
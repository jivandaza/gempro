import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'CLIENTE'],
        default: 'CLIENTE'
    }
}, {
    timestamps: true
});

// Middleware para encriptar el password antes de guardar el usuario
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch (error) {
        return next(error);
    }
});

export default mongoose.model('user', userSchema);
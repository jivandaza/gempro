import User from '../models/userModel.js';

// Función para obtener un usuario por su id
const getUserById = async (id) => {
    return await User.findById(id).select('-password');
};

// Función para obtener todos los usuarios de rol cliente
const getAllUsers = async () => {
    return await User.find({ role: 'CLIENTE' }).select('-password');
};

export default {
    getAllUsers,
    getUserById
};
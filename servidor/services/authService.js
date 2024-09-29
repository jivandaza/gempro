import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

// Función para obtener un usuario por correo electrónico
const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

// Función para registrar un usuario
const registerUser = async (data) => {
    const user = new User(data);

    // Crear el nuevo usuario
    await user.save();
};

// Función para verificar la contraseña
const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

export default {
    getUserByEmail,
    registerUser,
    verifyPassword
};
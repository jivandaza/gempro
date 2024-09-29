import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configuración de variables jwt
export default {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
};
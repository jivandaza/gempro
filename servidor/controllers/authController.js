import authService from "../services/authService.js";
import {generateToken} from "../helpers/jwtHelper.js";

// Función para registrar un usuario
export const registerUser = async (req, res) => {
    const {email, name, lastName, phone, address, password} = req?.body;

    try {
        // Verificar que el correo electrónico sea obligatorio
        if (!email) {
            return res.status(400).json({error: 'El correo electrónico es obligatorio'});
        }
        // Verificar que el nombre sea obligatorio
        if (!name) {
            return res.status(400).json({error: 'El nombre es obligatorio'});
        }
        // Verificar que el apellido sea obligatorio
        if (!lastName) {
            return res.status(400).json({error: 'El apellido es obligatorio'});
        }
        // Verificar que el número de celular sea obligatorio
        if (!phone) {
            return res.status(400).json({error: 'El número de celular es obligatorio'});
        }
        // Verificar que la dirección sea obligatoria
        if (!address) {
            return res.status(400).json({error: 'La dirección es obligatoria'});
        }
        // Verificar que la contraseña contenga mínimo 6 caracteres
        if (!password || password?.length < 6) {
            return res.status(400).json({error: 'La contraseña permite mínimo 6 caracteres'});
        }

        const existingUser = await authService.getUserByEmail(email);

        // Verificar si el usuario ya existe por el correo electrónico
        if (existingUser) {
            return res.status(400).json({error: 'El correo electrónico ya existe'});
        }

        await authService.registerUser(req.body);
        res.status(201).json({ message: 'Registrado exitosamente' });
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            error: 'Ocurrió un error, intenta más tarde',
        });
    }
};

// Función para inicio de sesión de un usuario
export const loginUser = async (req, res) => {
    const { email, password } = req?.body;

    try {
        // Verificar que el correo electrónico sea obligatorio
        if (!email) {
            return res.status(400).json({error: 'El correo electrónico es obligatorio'});
        }
        // Verificar que la contraseña contenga mínimo 6 caracteres
        if (!password || password?.length < 6) {
            return res.status(400).json({error: 'La contraseña permite mínimo 6 caracteres'});
        }

        const user = await authService.getUserByEmail(email);

        if (!user) {
            return res.status(400).json({ error: 'El correo electrónico no existe' });
        }

        // Verificar la contraseña
        const isMatch = await authService.verifyPassword(password, user?.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'La contraseña no coincide' });
        }

        // Generar un token JWT
        const token = generateToken(user);

        delete user?.password;

        res.status(200).json({ message: 'Inicio de sesión exitoso', token, user });
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            error: 'Ocurrió un error, intenta más tarde',
        });
    }
};
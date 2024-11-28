import authService from "../services/authService.js";
import {generateToken} from "../helpers/jwtHelper.js";

// Función para registrar un usuario
export const registerUser = async (req, res) => {
    const {email, name, lastName, phone, address, password} = req?.body;

    try {
        // Verificar que el correo tenga el símbolo '@' y un punto '.'
        if (!email.includes('@') || !email.includes('.')) {
            return res.status(400).json({error: 'El correo electrónico debe contener "@" y un punto "."'});
        }
        // Verificar que el correo electrónico tenga mínimo 6 caracteres
        if (email.length < 6) {
            return res.status(400).json({error: 'El correo electrónico permite mínimo 6 caracteres'});
        }
        // Verificar que el correo electrónico tenga máximo 30 caracteres
        if (email.length > 30) {
            return res.status(400).json({error: 'El correo electrónico permite máximo 30 caracteres'});
        }
        // Verificar que el nombre permita mínimo 3 caracteres
        if (name.length < 3) {
            return res.status(400).json({error: 'El nombre permite mínimo 3 caracteres'});
        }
        // Verificar que el nombre permita máximo 25 caracteres
        if (name.length > 25) {
            return res.status(400).json({error: 'El nombre máximo 25 caracteres'});
        }
        // Verificar que el apellido permita mínimo 5 caracteres
        if (lastName.length < 5) {
            return res.status(400).json({error: 'El apellido permite mínimo 5 caracteres'});
        }
        // Verificar que el apellido permita máximo 25 caracteres
        if (lastName.length > 25) {
            return res.status(400).json({error: 'El apellido permite máximo 25 caracteres'});
        }
        // Verificar que el número de celular permita 10 caracteres
        if (phone.length !== 10) {
            return res.status(400).json({error: 'El número de celular permite solo 10 caracteres'});
        }
        // Verificar que la dirección permita mínimo 10 caracteres
        if (address.length < 10) {
            return res.status(400).json({error: 'La dirección permite mínimo 10 caracteres'});
        }
        // Verificar que la dirección permita máximo 30 caracteres
        if (address.length > 30) {
            return res.status(400).json({error: 'La dirección permite máximo 30 caracteres'});
        }
        // Verificar que la contraseña contenga mínimo 6 caracteres
        if (password?.length < 6) {
            return res.status(400).json({error: 'La contraseña permite mínimo 6 caracteres'});
        }
        // Verificar que la contraseña contenga máximo 15 caracteres
        if (password?.length > 15) {
            return res.status(400).json({error: 'La contraseña permite máximo 15 caracteres'});
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
        // Verificar que el correo tenga el símbolo '@' y un punto '.'
        if (!email.includes('@') || !email.includes('.')) {
            return res.status(400).json({error: 'El correo electrónico debe contener "@" y un punto "."'});
        }
        // Verificar que el correo electrónico tenga minimo 6 caracteres
        if (email.length < 6) {
            return res.status(400).json({error: 'El correo electrónico permite mínimo 6 caracteres'});
        }
        // Verificar que el correo electrónico tenga maximo 30 caracteres
        if (email.length > 30) {
            return res.status(400).json({error: 'El correo electrónico permite maximo 30 caracteres'});
        }
        // Verificar que la contraseña contenga mínimo 6 caracteres
        if (password?.length < 6) {
            return res.status(400).json({error: 'La contraseña permite mínimo 6 caracteres'});
        }
        // Verificar que la contraseña contenga maximo 15 caracteres
        if (password?.length > 15) {
            return res.status(400).json({error: 'La contraseña permite maximo 15 caracteres'});
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
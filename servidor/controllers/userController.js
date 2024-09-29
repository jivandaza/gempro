import userService from '../services/userService.js';

// Función para obtener un usuario
export const getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req?.params.id);
        res.status(200).json({user});
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            error: 'Ocurrió un error, intenta más tarde',
        });
    }
};

// Función para obtener todos los usuarios de rol cliente
export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({users});
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            error: 'Ocurrió un error, intenta más tarde',
        });
    }
};
import { loginUser } from '../../controllers/authController.js';
import authService from '../../services/authService.js';
import { generateToken } from '../../helpers/jwtHelper.js';

jest.mock('../../services/authService.js'); // Mockeo del servicio
jest.mock('../../helpers/jwtHelper.js');    // Mockeo del helper

describe('Login User', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                password: '123456'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('Debe devolver error si el correo electrónico no contiene "@" o "."', async () => {
        req.body.email = 'testexamplecom'; // Correo sin '@' y sin '.'

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El correo electrónico debe contener "@" y un punto "."' });
    });

    it('Debe devolver error si el correo electrónico tiene menos de 6 caracteres', async () => {
        req.body.email = 'a@b.c'; // Correo con menos de 6 caracteres

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El correo electrónico permite mínimo 6 caracteres' });
    });

    it('Debe devolver error si el correo electrónico tiene más de 30 caracteres', async () => {
        req.body.email = 'a'.repeat(31) + '@example.com'; // Correo con más de 30 caracteres

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El correo electrónico permite maximo 30 caracteres' });
    });

    it('Debe devolver error si la contraseña tiene menos de 6 caracteres', async () => {
        req.body.password = '123'; // Contraseña con menos de 6 caracteres

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'La contraseña permite mínimo 6 caracteres' });
    });

    it('Debe devolver error si la contraseña tiene más de 15 caracteres', async () => {
        req.body.password = '1234567890123456'; // Contraseña con más de 15 caracteres

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'La contraseña permite maximo 15 caracteres' });
    });

    it('Debe devolver error si el usuario no existe', async () => {
        authService.getUserByEmail.mockResolvedValue(null); // Usuario no existe

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El correo electrónico no existe' });
    });

    it('Debe devolver error si la contraseña es incorrecta', async () => {
        const user = { email: 'test@example.com', password: 'hashed_password' };
        authService.getUserByEmail.mockResolvedValue(user);
        authService.verifyPassword.mockResolvedValue(false); // Contraseña incorrecta

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'La contraseña no coincide' });
    });

    it('Debe iniciar sesión exitosamente y devolver token', async () => {
        const user = { email: 'test@example.com', password: 'hashed_password' };
        authService.getUserByEmail.mockResolvedValue(user);
        authService.verifyPassword.mockResolvedValue(true); // Contraseña correcta
        generateToken.mockReturnValue('fake_token'); // Token simulado

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Inicio de sesión exitoso',
            token: 'fake_token',
            user: { email: 'test@example.com' }
        });
    });

    it('Debe manejar errores internos del servidor', async () => {
        authService.getUserByEmail.mockRejectedValue(new Error('Error de DB'));

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Ocurrió un error, intenta más tarde'
        });
    });
});

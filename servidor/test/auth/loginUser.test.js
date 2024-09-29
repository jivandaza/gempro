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

    it('Debe devolver error si no hay correo electrónico', async () => {
        req.body.email = ''; // Correo vacío

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El correo electrónico es obligatorio' });
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

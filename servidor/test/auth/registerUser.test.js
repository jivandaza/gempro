import { registerUser } from '../../controllers/authController';
import authService from '../../services/authService';

jest.mock('../../services/authService'); // Mockeo del servicio

describe('Register User', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                name: 'John',
                lastName: 'Doe',
                phone: '1234567890',
                address: '123 Main St',
                password: '123456'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('Debe devolver error si faltan datos obligatorios', async () => {
        req.body.email = ''; // Correo vacío

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El correo electrónico es obligatorio' });
    });

    it('Debe devolver error si el correo ya existe', async () => {
        authService.getUserByEmail.mockResolvedValue({ email: 'test@example.com' });

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El correo electrónico ya existe' });
    });

    it('Debe registrar un nuevo usuario exitosamente', async () => {
        authService.getUserByEmail.mockResolvedValue(null); // No existe usuario
        authService.registerUser.mockResolvedValue({});     // Simular registro

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Registrado exitosamente' });
    });

    it('Debe manejar errores internos del servidor', async () => {
        authService.getUserByEmail.mockRejectedValue(new Error('Error de DB'));

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Ocurrió un error, intenta más tarde'
        });
    });
});

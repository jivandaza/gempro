import { registerUser } from '../../controllers/authController';
import authService from '../../services/authService';

jest.mock('../../services/authService'); // Mockeo del servicio

describe('Registrarse', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                name: 'John',
                lastName: 'Gutierrez',
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

    it('Debe devolver error si el correo electrónico no contiene "@" o "."', async () => {
        req.body.email = 'testexamplecom'; // Correo sin '@' y sin '.'

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El correo electrónico debe contener "@" y un punto "."' });
    });

    it('Debe devolver error si el correo electrónico tiene menos de 6 caracteres', async () => {
        req.body.email = 'a@b.c'; // Correo con menos de 6 caracteres

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El correo electrónico permite mínimo 6 caracteres' });
    });

    it('Debe devolver error si el correo electrónico tiene más de 30 caracteres', async () => {
        req.body.email = 'a'.repeat(31) + '@example.com'; // Correo con más de 30 caracteres

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El correo electrónico permite máximo 30 caracteres' });
    });

    it('Debe devolver error si el nombre tiene menos de 3 caracteres', async () => {
        req.body.name = 'Jo'; // Nombre con menos de 3 caracteres

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El nombre permite mínimo 3 caracteres' });
    });

    it('Debe devolver error si el nombre tiene más de 25 caracteres', async () => {
        req.body.name = 'J'.repeat(26); // Nombre con más de 25 caracteres

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El nombre máximo 25 caracteres' });
    });

    it('Debe devolver error si el apellido tiene menos de 5 caracteres', async () => {
        req.body.lastName = 'Do'; // Apellido con menos de 5 caracteres

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El apellido permite mínimo 5 caracteres' });
    });

    it('Debe devolver error si el apellido tiene más de 25 caracteres', async () => {
        req.body.lastName = 'D'.repeat(26); // Apellido con más de 25 caracteres

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El apellido permite máximo 25 caracteres' });
    });

    it('Debe devolver error si el teléfono tiene menos de 10 caracteres', async () => {
        req.body.phone = '123456789'; // Teléfono con menos de 10 caracteres

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El número de celular permite solo 10 caracteres' });
    });

    it('Debe devolver error si la dirección tiene menos de 10 caracteres', async () => {
        req.body.address = '123 St'; // Dirección con menos de 10 caracteres

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'La dirección permite mínimo 10 caracteres' });
    });

    it('Debe devolver error si la dirección tiene más de 30 caracteres', async () => {
        req.body.address = 'A'.repeat(31); // Dirección con más de 30 caracteres

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'La dirección permite máximo 30 caracteres' });
    });

    it('Debe devolver error si la contraseña tiene menos de 6 caracteres', async () => {
        req.body.password = '12345'; // Contraseña con menos de 6 caracteres

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'La contraseña permite mínimo 6 caracteres' });
    });

    it('Debe devolver error si la contraseña tiene más de 15 caracteres', async () => {
        req.body.password = '1234567890123456'; // Contraseña con más de 15 caracteres

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'La contraseña permite máximo 15 caracteres' });
    });

    it('Debe devolver error si el correo electrónico ya existe', async () => {
        authService.getUserByEmail.mockResolvedValue({ email: 'test@example.com' }); // Usuario existente

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


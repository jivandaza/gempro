import { getUser } from '../../controllers/userController.js';
import userService from '../../services/userService.js';

// Mock del servicio
jest.mock('../../services/userService.js');

describe('Get User', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {
                id: '12345'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
    it('Debe devolver un usuario correctamente', async () => {
        const mockUser = { id: '12345', name: 'Test User' };
        userService.getUserById.mockResolvedValue(mockUser); // Simular usuario

        await getUser(req, res);

        expect(userService.getUserById).toHaveBeenCalledWith('12345');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ user: mockUser });
    });

    it('Debe manejar errores y devolver un error 500', async () => {
        userService.getUserById.mockRejectedValue(new Error('DB error'));

        await getUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Ocurrió un error, intenta más tarde' });
    });
});

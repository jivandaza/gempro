import { getAllUsers } from '../../controllers/userController.js';
import userService from '../../services/userService.js';

// Mock del servicio
jest.mock('../../services/userService.js');

describe('Get All Users', () => {
    let req, res;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('Debe devolver una lista de usuarios', async () => {
        const mockUsers = [
            { id: '123', name: 'User 1' },
            { id: '456', name: 'User 2' }
        ];
        userService.getAllUsers.mockResolvedValue(mockUsers); // Simular lista de usuarios

        await getAllUsers(req, res);

        expect(userService.getAllUsers).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ users: mockUsers });
    });

    it('Debe manejar errores y devolver un error 500', async () => {
        userService.getAllUsers.mockRejectedValue(new Error('DB error'));

        await getAllUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Ocurrió un error, intenta más tarde' });
    });
});

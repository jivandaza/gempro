import { getAllMateriales } from '../../controllers/materialController.js';
import materialService from '../../services/materialService.js';

jest.mock('../../services/materialService.js');

describe('Get All Materiales', () => {
    let req, res;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('Debe devolver todos los materiales', async () => {
        const materiales = [{ name: 'Gold' }, { name: 'Silver' }];
        materialService.getAllMateriales.mockResolvedValue(materiales);

        await getAllMateriales(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ materiales });
    });

    it('Debe manejar errores internos del servidor', async () => {
        materialService.getAllMateriales.mockRejectedValue(new Error('Error interno'));

        await getAllMateriales(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Ocurrió un error, intenta más tarde' });
    });
});

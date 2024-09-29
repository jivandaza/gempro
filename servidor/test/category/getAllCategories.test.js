import { getAllCategories } from '../../controllers/categoryController.js';
import categoryService from '../../services/categoryService.js';

jest.mock('../../services/categoryService.js');

describe('Get All Categories', () => {
    let req, res;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('Debe devolver todas las categorías', async () => {
        const categories = [{ name: 'Electronics' }, { name: 'Books' }];
        categoryService.getAllCategories.mockResolvedValue(categories);

        await getAllCategories(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ categories });
    });

    it('Debe manejar errores internos del servidor', async () => {
        categoryService.getAllCategories.mockRejectedValue(new Error('Error interno'));

        await getAllCategories(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Ocurrió un error, intenta más tarde' });
    });
});

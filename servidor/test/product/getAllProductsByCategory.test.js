import { getAllProductsByCategory } from '../../controllers/productController.js';
import productService from '../../services/productService.js';

jest.mock('../../services/productService.js');

describe('Get All Products By Category', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {
                category: 'category1'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            sendStatus: jest.fn()
        };
    });

    it('Debe devolver error si la categoría no está presente', async () => {
        req.params.category = ''; // Categoría vacía

        await getAllProductsByCategory(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it('Debe devolver los productos por categoría', async () => {
        const products = [{ name: 'Product1' }, { name: 'Product2' }];
        productService.getAllProductsByCategory.mockResolvedValue(products);

        await getAllProductsByCategory(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ products });
    });

    it('Debe manejar errores internos del servidor', async () => {
        productService.getAllProductsByCategory.mockRejectedValue(new Error('Error interno'));

        await getAllProductsByCategory(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Ocurrió un error, intenta más tarde',
        });
    });
});

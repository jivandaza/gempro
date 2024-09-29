import { getAllProducts } from '../../controllers/productController.js';
import productService from '../../services/productService.js';

jest.mock('../../services/productService.js');

describe('Get All Products', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('Debe devolver todos los productos', async () => {
        const products = [{ name: 'Product1' }, { name: 'Product2' }];
        productService.getAllProducts.mockResolvedValue(products);

        await getAllProducts(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ products });
    });

    it('Debe manejar errores internos del servidor', async () => {
        productService.getAllProducts.mockRejectedValue(new Error('Error interno'));

        await getAllProducts(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Ocurrió un error, intenta más tarde',
        });
    });
});

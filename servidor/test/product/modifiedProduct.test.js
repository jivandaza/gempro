import { modifiedProduct } from '../../controllers/productController.js';
import productService from '../../services/productService.js';

jest.mock('../../services/productService.js');

describe('Modified Product', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                _id: 'productId',
                name: 'Product1',
                quantity: 10
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('Debe devolver error si faltan datos obligatorios', async () => {
        req.body.name = ''; // Nombre vacío

        await modifiedProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El nombre es obligatorio' });
    });

    it('Debe devolver error si el producto ya existe con otro ID', async () => {
        productService.getProductByName.mockResolvedValue({
            _id: 'anotherId',
            name: 'Product1'
        });

        await modifiedProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El producto ya existe' });
    });

    it('Debe modificar el producto exitosamente', async () => {
        productService.getProductByName.mockResolvedValue({
            _id: 'productId',
            name: 'Product1'
        });
        productService.modifyProduct.mockResolvedValue({ message: 'Producto modificado' });

        await modifiedProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Producto modificado exitosamente' });
    });

    it('Debe manejar errores internos del servidor', async () => {
        productService.getProductByName.mockRejectedValue(new Error('Error interno'));

        await modifiedProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Ocurrió un error, intenta más tarde',
        });
    });
});

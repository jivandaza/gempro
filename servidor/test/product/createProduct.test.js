import { createProduct } from '../../controllers/productController.js';
import productService from '../../services/productService.js';

jest.mock('../../services/productService.js');

describe('Create Product', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                name: 'Product1',
                quantity: 10,
                cost: 100,
                margin: 20,
                category: 'Category1',
                material: 'Material1',
                description: 'Product description',
                image: 'image-url'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('Debe devolver error si faltan datos obligatorios', async () => {
        req.body.name = ''; // Nombre vacío

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El nombre es obligatorio' });
    });

    it('Debe devolver error si el producto ya existe', async () => {
        productService.getProductByName.mockResolvedValue({ name: 'Product1' });

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El producto ya existe' });
    });

    it('Debe crear el producto exitosamente', async () => {
        productService.getProductByName.mockResolvedValue(null);
        productService.createProduct.mockResolvedValue({ name: 'Product1' });

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Producto creado exitosamente' });
    });

    it('Debe manejar errores internos del servidor', async () => {
        productService.getProductByName.mockRejectedValue(new Error('Error interno'));

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Ocurrió un error, intenta más tarde',
        });
    });
});

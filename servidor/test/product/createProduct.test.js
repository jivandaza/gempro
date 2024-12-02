import { createProduct } from '../../controllers/productController.js';
import productService from '../../services/productService.js';
import {registerUser} from "../../controllers/authController.js";

jest.mock('../../services/productService.js');

describe('Crear Producto', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                name: 'Product1',
                quantity: 10,
                cost: 10000,
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

    it('Debe devolver error si el nombre tiene menos de 5 caracteres', async () => {
        req.body.name = 'pro1';

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El nombre permite mínimo 5 caracteres' });
    });

    it('Debe devolver error si el nombre tiene más de 25 caracteres', async () => {
        req.body.name = 'a'.repeat(26);

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El nombre permite máximo 25 caracteres' });
    });

    it('Debe devolver error si la cantidad no tiene ningún valor', async () => {
        req.body.quantity = '';

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'La cantidad es obligatoria' });
    });

    it('Debe devolver error si la cantidad es menor a 1', async () => {
        req.body.quantity = '0';

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'La cantidad debe ser mayor o igual a 1' });
    });

    it('Debe devolver error si la cantidad es mayor a 100', async () => {
        req.body.quantity = '101';

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'La cantidad debe ser menor o igual a 100' });
    });

    it('Debe devolver error si el costo no tiene ningún valor', async () => {
        req.body.cost = '';

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El costo es obligatorio' });
    });

    it('Debe devolver error si el costo es menor a $10.000', async () => {
        req.body.cost = '9999';

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El costo debe ser mayor o igual a $10.000' });
    });

    it('Debe devolver error si el costo es mayor a $800.000', async () => {
        req.body.cost = '800001';

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El costo debe ser menor o igual a $800.000' });
    });

    it('Debe devolver error si el margen de ganancias no tiene ningún valor', async () => {
        req.body.margin = '';

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El margen de ganancias es obligatorio' });
    });

    it('Debe devolver error si el margen de ganancias es menor a 1%', async () => {
        req.body.margin = '0';

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El margen de ganancias debe ser mayor o igual a 1%' });
    });

    it('Debe devolver error si el margen de ganancias es mayor a 100%', async () => {
        req.body.margin = '101';

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El margen de ganancias debe ser menor o igual a 100%' });
    });

    it('Debe devolver error si la categoría no tiene ningún valor', async () => {
        req.body.category = '';

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'La categoría es obligatoria' });
    });

    it('Debe devolver error si el material no tiene ningún valor', async () => {
        req.body.material = '';

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El material es obligatorio' });
    });

    it('Debe devolver error si la descripción tiene menos de 10 caracteres', async () => {
        req.body.description = 'a'.repeat(9);

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'La descripción permite mínimo 10 caracteres' });
    });

    it('Debe devolver error si la descripción tiene más de 50 caracteres', async () => {
        req.body.description = 'a'.repeat(51);

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'La descripción permite máximo 50 caracteres' });
    });

    it('Debe devolver error si la imagen no tiene ningún valor', async () => {
        req.body.image = '';

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Debe cargar una imagen' });
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

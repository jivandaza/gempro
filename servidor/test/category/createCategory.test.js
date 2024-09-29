import { createCategory } from '../../controllers/categoryController.js';
import categoryService from '../../services/categoryService.js';

jest.mock('../../services/categoryService.js');

describe('Create Category', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: { name: 'Electronics', image: 'image_url' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('Debe devolver error si el nombre no está presente', async () => {
        req.body.name = ''; // Name vacío
        await createCategory(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El nombre es obligatorio' });
    });

    it('Debe devolver error si la imagen no está presente', async () => {
        req.body.image = ''; // Imagen vacía
        await createCategory(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Debe cargar una imagen' });
    });

    it('Debe devolver error si la categoría ya existe', async () => {
        categoryService.getCategoryByName.mockResolvedValue({ name: 'Electronics' }); // Categoría existente

        await createCategory(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'La categoría ya existe' });
    });

    it('Debe crear la categoría exitosamente', async () => {
        categoryService.getCategoryByName.mockResolvedValue(null); // No existe categoría
        categoryService.createCategory.mockResolvedValue({ name: 'Electronics', image: 'image_url' });

        await createCategory(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Categoría creada exitosamente' });
    });

    it('Debe manejar errores internos del servidor', async () => {
        categoryService.getCategoryByName.mockRejectedValue(new Error('Error interno'));

        await createCategory(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Ocurrió un error, intenta más tarde' });
    });
});

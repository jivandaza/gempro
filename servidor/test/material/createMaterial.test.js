import { createMaterial } from '../../controllers/materialController.js';
import materialService from '../../services/materialService.js';

jest.mock('../../services/materialService.js');

describe('Create Material', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: { name: 'Gold' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('Debe devolver error si el nombre no está presente', async () => {
        req.body.name = ''; // Nombre vacío

        await createMaterial(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El nombre es obligatorio' });
    });

    it('Debe devolver error si el material ya existe', async () => {
        materialService.getMaterialByName.mockResolvedValue({ name: 'Gold' }); // Material existente

        await createMaterial(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'El material ya existe' });
    });

    it('Debe crear el material exitosamente', async () => {
        materialService.getMaterialByName.mockResolvedValue(null); // No existe material
        materialService.createMaterial.mockResolvedValue({ name: 'Gold' });

        await createMaterial(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Material creado exitosamente' });
    });

    it('Debe manejar errores internos del servidor', async () => {
        materialService.getMaterialByName.mockRejectedValue(new Error('Error interno'));

        await createMaterial(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Ocurrió un error, intenta más tarde' });
    });
});

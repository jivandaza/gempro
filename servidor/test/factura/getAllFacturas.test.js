import { getAllFacturas } from '../../controllers/facturaController.js';
import facturaService from '../../services/facturaService.js';

jest.mock('../../services/facturaService.js');

describe('Get All Facturas', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('Debe devolver todas las facturas', async () => {
        const facturas = [{ id: 'factura1' }, { id: 'factura2' }];
        facturaService.getAllFacturas.mockResolvedValue(facturas);

        await getAllFacturas(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ facturas });
    });

    it('Debe manejar errores internos del servidor', async () => {
        facturaService.getAllFacturas.mockRejectedValue(new Error('Error interno'));

        await getAllFacturas(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Ocurrió un error, intenta más tarde',
        });
    });
});

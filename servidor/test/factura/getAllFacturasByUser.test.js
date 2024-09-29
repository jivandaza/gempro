import { getAllFacturasByUser } from '../../controllers/facturaController.js';
import facturaService from '../../services/facturaService.js';

jest.mock('../../services/facturaService.js');

describe('Get All Facturas By User', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: { id: 'userId' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('Debe devolver todas las facturas de un usuario', async () => {
        const facturas = [{ id: 'factura1' }, { id: 'factura2' }];
        facturaService.getAllFacturasByUser.mockResolvedValue(facturas);

        await getAllFacturasByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ facturas });
    });

    it('Debe manejar errores internos del servidor', async () => {
        facturaService.getAllFacturasByUser.mockRejectedValue(new Error('Error interno'));

        await getAllFacturasByUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Ocurrió un error, intenta más tarde',
        });
    });
});

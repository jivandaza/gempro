import { registerFactura } from '../../controllers/facturaController.js';
import facturaService from '../../services/facturaService.js';
import productService from '../../services/productService.js';

jest.mock('../../services/facturaService.js');
jest.mock('../../services/productService.js');

describe('Register Factura', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                products: [
                    { id: 'product1', quantity: 2 },
                    { id: 'product2', quantity: 3 }
                ]
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('Debe registrar una factura exitosamente', async () => {
        productService.updateQuantityProduct.mockResolvedValue();
        facturaService.registerFactura.mockResolvedValue();

        await registerFactura(req, res);

        expect(productService.updateQuantityProduct).toHaveBeenCalledTimes(2);
        expect(facturaService.registerFactura).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Compra realizada exitosamente' });
    });

    it('Debe manejar errores si ocurre un problema con el servicio de productos', async () => {
        productService.updateQuantityProduct.mockRejectedValue(new Error('Error al actualizar producto'));

        await registerFactura(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Ocurrió un error, intenta más tarde',
        });
    });

    it('Debe manejar errores si ocurre un problema con el servicio de facturas', async () => {
        productService.updateQuantityProduct.mockResolvedValue();
        facturaService.registerFactura.mockRejectedValue(new Error('Error al registrar factura'));

        await registerFactura(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Ocurrió un error, intenta más tarde',
        });
    });
});

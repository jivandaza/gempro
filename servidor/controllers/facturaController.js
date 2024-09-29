import facturaService from "../services/facturaService.js";
import productService from "../services/productService.js";

export const getAllFacturasByUser = async (req, res) => {
    const { id } = req?.params;

    try {
        const facturas = await facturaService.getAllFacturasByUser(id);

        res.status(200).json({facturas});
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            error: 'Ocurrió un error, intenta más tarde',
        });
    }
};

export const getAllFacturas = async (req, res) => {
    try {
        const facturas = await facturaService.getAllFacturas();

        res.status(200).json({facturas});
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            error: 'Ocurrió un error, intenta más tarde',
        });
    }
};

export const registerFactura = async (req, res) => {
    try {
        await Promise.all(req?.body?.products.map(async (product) => {
            await productService.updateQuantityProduct(product);
        }));

        await facturaService.registerFactura(req?.body);

        res.status(201).json({message: 'Compra realizada exitosamente'});
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            error: 'Ocurrió un error, intenta más tarde',
        });
    }
};
import FacturaModel from "../models/facturaModel.js";

const getAllFacturasByUser = async (idUser) => {
    return await FacturaModel.find({idUser: idUser});
};

const getAllFacturas = async () => {
    return await FacturaModel.find().populate('idUser');
};

const registerFactura = async (data) => {
    const factura = new FacturaModel(data);

    await factura.save();
};

export default {
    getAllFacturasByUser,
    getAllFacturas,
    registerFactura
};
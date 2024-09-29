import Material from '../models/materialModel.js';

// Función para obtener material por nombre
const getMaterialByName = async (name) => {
    return await Material.findOne({name});
};

// Función para obtener todos los materiales
const getAllMateriales = async () => {
    return await Material.find();
};

// Función para crear un nuevo material
const createMaterial = async (name) => {
    const material = new Material({name: name});

    // Guardar material en la base de datos
    await material.save();
};

export default {
    getMaterialByName,
    getAllMateriales,
    createMaterial
};
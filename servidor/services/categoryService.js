import Category from '../models/categoryModel.js';

// Función para obtener categoría por nombre
const getCategoryByName = async (name) => {
    return await Category.findOne({name});
};

// Función para obtener todas las categorías
const getAllCategories = async () => {
    return await Category.find();
};

// Función para crear una nueva categoría
const createCategory = async (data) => {
    const category = new Category({
        name: data.name,
        image: data.image
    });

    // Guardar categoría en la base de datos
    await category.save();
};

export default {
    getCategoryByName,
    getAllCategories,
    createCategory
};
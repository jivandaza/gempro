import Category from '../models/categoryModel.js';

// Función para obtener categoría por nombre
const getCategoryByName = async (name) => {
    return await Category.findOne({name});
};

// Función para obtener todas las categorías
const getAllCategories = async () => {
    return await Category.find();
};

const getCategoriesByCategory = async (category) => {

    // Buscar categorías cuyo nombre comience con el parámetro proporcionado
    const categories = await Category.find({
        name: { $regex: `^${category}`, $options: 'i' } // Insensible a mayúsculas/minúsculas
    });

    return await categories;
}

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
    getCategoriesByCategory,
    createCategory
};
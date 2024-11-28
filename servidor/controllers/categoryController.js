import categoryService from "../services/categoryService.js";

export const createCategory = async (req, res) => {
    const { name, image } = req?.body;

    try {
        if (!name) {
            return res.status(400).json({error: 'El nombre es obligatorio'});
        }
        if (!image) {
            return res.status(400).json({error: 'Debe cargar una imagen'});
        }

        const existCategory = await categoryService.getCategoryByName(name);

        if (existCategory) {
            return res.status(400).json({error: 'La categoría ya existe'});
        }

        await categoryService.createCategory({name, image});

        return res.status(201).json({message: 'Categoría creada exitosamente'});
    }  catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            error: 'Ocurrió un error, intenta más tarde',
        });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();

        return res.status(200).json({categories});
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            error: 'Ocurrió un error, intenta más tarde',
        });
    }
};

export const getCategoriesByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const categories = await categoryService.getCategoriesByCategory(category);

        // Verificar si se encontraron categorías
        if (categories.length === 0) {
            return res.status(404).json({ message: 'No se encontraron categorías.' });
        }

        return res.status(200).json({categories});
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            error: 'Ocurrió un error, intenta más tarde',
        });
    }
};
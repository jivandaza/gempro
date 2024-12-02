import productService from "../services/productService.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();

        return res.status(200).json({products});
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            error: 'Ocurrió un error, intenta más tarde',
        });
    }
};

export const createProduct = async (req, res) => {
    const { name, quantity, cost, margin, category, material, description, image } = req?.body;

    try {
        if (name.length < 5) {
            return res.status(400).json({error: 'El nombre permite mínimo 5 caracteres'});
        }
        if (name.length > 25) {
            return res.status(400).json({error: 'El nombre permite máximo 25 caracteres'});
        }
        if (!quantity) {
            return res.status(400).json({error: 'La cantidad es obligatoria'});
        }
        if (parseInt(quantity) < 1) {
            return res.status(400).json({error: 'La cantidad debe ser mayor o igual a 1'});
        }
        if (parseInt(quantity) > 100) {
            return res.status(400).json({error: 'La cantidad debe ser menor o igual a 100'});
        }
        if (!cost) {
            return res.status(400).json({error: 'El costo es obligatorio'});
        }
        if (parseInt(cost) < 10000) {
            return res.status(400).json({error: 'El costo debe ser mayor o igual a $10.000'});
        }
        if (parseInt(cost) > 800000) {
            return res.status(400).json({error: 'El costo debe ser menor o igual a $800.000'});
        }
        if (!margin) {
            return res.status(400).json({error: 'El margen de ganancias es obligatorio'});
        }
        if (parseInt(margin) < 1) {
            return res.status(400).json({error: 'El margen de ganancias debe ser mayor o igual a 1%'});
        }
        if (parseInt(margin) > 100) {
            return res.status(400).json({error: 'El margen de ganancias debe ser menor o igual a 100%'});
        }
        if (!category) {
            return res.status(400).json({error: 'La categoría es obligatoria'});
        }
        if (!material) {
            return res.status(400).json({error: 'El material es obligatorio'});
        }
        if (description.length < 10) {
            return res.status(400).json({error: 'La descripción permite mínimo 10 caracteres'});
        }
        if (description.length > 50) {
            return res.status(400).json({error: 'La descripción permite máximo 50 caracteres'});
        }
        if (!image) {
            return res.status(400).json({error: 'Debe cargar una imagen'});
        }

        const existProduct = await productService.getProductByName(name);

        if (existProduct) {
            return res.status(400).json({error: 'El producto ya existe'});
        }

        await productService.createProduct(req?.body);

        return res.status(201).json({message: 'Producto creado exitosamente'});
    }  catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            error: 'Ocurrió un error, intenta más tarde',
        });
    }
};

export const modifiedProduct = async (req, res) => {
    const { _id, name, quantity } = req?.body;

    try {
        if (!name) {
            return res.status(400).json({error: 'El nombre es obligatorio'});
        }
        if (!quantity) {
            return res.status(400).json({error: 'La cantidad es obligatoria'});
        }
        if (parseInt(quantity) < 1) {
            return res.status(400).json({error: 'La cantidad debe ser mayor a cero'});
        }

        const product = await productService.getProductByName(name);

        if (_id !== product?._id.toString() && name === product?.name) {
            return res.status(400).json({error: 'El producto ya existe'});
        }

        await productService.modifyProduct(req?.body);

        return res.status(200).json({message: 'Producto modificado exitosamente'});
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            error: 'Ocurrió un error, intenta más tarde',
        });
    }
};

export const getAllProductsByCategory = async (req, res) => {
    let { category } = req?.params;

    try {
        if (!category) {
            return res.sendStatus(404);
        }

        category = category.replace(/-/g, ' ');

        const products = await productService.getAllProductsByCategory(category);

        return res.status(200).json({products});
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            error: 'Ocurrió un error, intenta más tarde',
        });
    }
};
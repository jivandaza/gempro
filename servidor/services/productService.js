import Product from '../models/productModel.js';
import categoryService from "./categoryService.js";

// Función para obtener producto por nombre
const getProductByName = async (name) => {
    return await Product.findOne({name});
};

// Función para obtener todos los productos
const getAllProducts = async () => {
    return await Product.find().populate('category').populate('material');
};

// Función para crear un nuevo producto
const createProduct = async (data) => {

    const cost = parseInt(data?.cost);
    const margin = parseInt(data?.margin);
    const unitValue = cost + (cost * (margin / 100));

    const product = new Product({
        name: data.name,
        quantity: data.quantity,
        cost,
        margin,
        unitValue,
        category: data.category,
        material: data.material,
        description: data.description,
        image: data.image
    });

    // Guardar producto en la base de datos
    await product.save();
};

// Función para modificar un producto
const modifyProduct = async (product) => {
    // Actualiza el producto en la base de datos
    await Product.findByIdAndUpdate(product?._id, product);
};

const updateQuantityProduct = async (product) => {
    const currentProduct = await getProductByName(product?.name);
    const newQuantity = currentProduct?.quantity - product?.quantity;
    await Product.findByIdAndUpdate(currentProduct?._id, {quantity: newQuantity});
}

const getAllProductsByCategory = async (category) => {
    const Category = await categoryService.getCategoryByName(category);
    return Product.find({category: Category?._id});
};

export default {
    getProductByName,
    getAllProducts,
    createProduct,
    modifyProduct,
    getAllProductsByCategory,
    updateQuantityProduct
};
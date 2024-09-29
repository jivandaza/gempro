import express from 'express';
import authenticateToken from '../middlewares/authMiddleware.js';
import {
    getAllProducts,
    createProduct,
    modifiedProduct,
    getAllProductsByCategory
} from '../controllers/productController.js';

const router = express.Router();

// Rutas de categoría
router.get('/', authenticateToken, getAllProducts);
router.post('/', authenticateToken, createProduct);
router.put('/', authenticateToken, modifiedProduct);
router.get('/:category', getAllProductsByCategory);

export default router;
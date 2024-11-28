import express from 'express';
import authenticateToken from '../middlewares/authMiddleware.js';
import {
    getAllCategories,
    getCategoriesByCategory,
    createCategory
} from '../controllers/categoryController.js';

const router = express.Router();

// Rutas de categoría
router.get('/', getAllCategories);
router.get('/:category', getCategoriesByCategory);
router.post('/', authenticateToken, createCategory);

export default router;
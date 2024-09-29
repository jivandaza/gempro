import express from 'express';
import authenticateToken from '../middlewares/authMiddleware.js';
import {
    getAllCategories,
    createCategory
} from '../controllers/categoryController.js';

const router = express.Router();

// Rutas de categoría
router.get('/', getAllCategories);
router.post('/', authenticateToken, createCategory);

export default router;
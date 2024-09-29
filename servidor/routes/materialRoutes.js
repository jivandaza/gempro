import express from 'express';
import authenticateToken from '../middlewares/authMiddleware.js';
import {
    getAllMateriales,
    createMaterial
} from '../controllers/materialController.js';

const router = express.Router();

// Rutas de material
router.get('/', authenticateToken, getAllMateriales);
router.post('/', authenticateToken, createMaterial);

export default router;
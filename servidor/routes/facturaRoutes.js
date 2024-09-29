import express from 'express';
import authenticateToken from '../middlewares/authMiddleware.js';
import {
    getAllFacturasByUser,
    getAllFacturas,
    registerFactura,
} from '../controllers/facturaController.js';

const router = express.Router();

// Rutas de factura
router.get('/:id', authenticateToken, getAllFacturasByUser);
router.get('/', authenticateToken, getAllFacturas);
router.post('/', authenticateToken, registerFactura);

export default router;
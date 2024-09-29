import express from 'express';
import authenticateToken from '../middlewares/authMiddleware.js';
import {
    getUser,
    getAllUsers
} from '../controllers/userController.js';

const router = express.Router();

// Rutas de usuario
router.get('/:id', getUser);
router.get('/', authenticateToken, getAllUsers);

export default router;
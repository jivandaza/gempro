import { jwtConfig } from '../config/index.js';
import jwt from 'jsonwebtoken';

// Función para autenticar tokens JWT en solicitudes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: 'Sesión terminada' });

    jwt.verify(token, jwtConfig.secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Sesión expirada' });
        req.user = user;
        next();
    });
};

export default authenticateToken;
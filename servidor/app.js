import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import seedDatabase from "./utils/seedDatabase.js";
import { dbConfig } from './config/index.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import materialRoutes from './routes/materialRoutes.js';
import productRoutes from './routes/productRoutes.js';
import facturaRoutes from './routes/facturaRoutes.js';

// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middleware para analizar JSON en el cuerpo de la solicitud
app.use(express.json());
// Middleware para analizar datos codificados en URL
app.use(express.urlencoded({ extended: false }));
// Middleware para habilitar CORS
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
// Middleware para registrar solicitudes HTTP
app.use(morgan('dev'));

dbConfig.connectDB();

// Ejecutar la siembra de la base de datos si se está en desarrollo
if (process.env.NODE_ENV === 'development') {
    seedDatabase();
}

// Declaración de rutas
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/material', materialRoutes);
app.use('/api/product', productRoutes);
app.use('/api/factura', facturaRoutes);

export default app;
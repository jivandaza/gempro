import mongoose from 'mongoose';

// Conectar a la base de datos
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI); // Se conecta a la BD mongoDB
        console.log(`MongoDB conectado: ${conn.connection.db.databaseName}`); // Mensaje de conexión
    } catch (error) {
        console.error(`Error de conexión de MongoDB: ${error.message}`); // Mensaje de error en conexión
        process.exit(1); // Termina la aplicación si la conexión falla
    }
};

// exportar función
export default {
    connectDB,
};
import User from '../models/userModel.js';

// Función para insertar 1 usuario con el rol "ADMIN"
const seedUsers = async () => {
    try {
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ role: 'ADMIN' });
        if (!userExists) {
            const password = 'admin123';

            await User.create({
                email: 'admin@gmail.com',
                password,
                role: 'ADMIN'
            });
            console.log('Usuario administrador creado.');
        }
    } catch (error) {
        console.error(`Error al crear usuario administrador: ${error.message}`);
    }
};

// Función principal para ejecutar la semilla
const seedDatabase = async () => {
    try {
        await seedUsers();

        console.log('La base de datos se ha sembrado correctamente.');
    } catch (error) {
        console.error(`Error al sembrar la base de datos: ${error.message}`);
    }
};

export default seedDatabase;
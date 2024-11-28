import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import User from '../../models/userModel';

describe('Integración entre Autenticación y Usuarios', () => {

    let userId;

    // Prueba para registrar un usuario
    it('Registrarse', async () => {
        // Realizamos la solicitud HTTP de registrarse
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                name: 'John',
                lastName: 'Doe',
                phone: '123456789',
                address: '123 Main St',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(201); // Verificamos que el estado sea 201 (creado)
        expect(res.body.message).toBe('Registrado exitosamente'); // Verificamos que el mensaje sea el mismo que recibimos de la solicitud
    }, 10000);

    // Prueba para iniciar sesión con el usuario registrado
    it('Iniciar sesión', async () => {
        // Realizamos la solicitud HTTP de inicio de sesión
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200); // Verificamos que el estado sea 200 (éxito)
        expect(res.body.message).toBe('Inicio de sesión exitoso'); // Verificamos que el mensaje sea el mismo que recibimos de la solicitud
        userId = res.body.user._id; // Guardamos el ID del usuario para obtener el usuario
    }, 10000);

    // Prueba para obtener los datos de un usuario
    it('Obtener usuario', async () => {
        // Realizamos la solicitud HTTP de obtener un usuario
        const res = await request(app)
            .get(`/api/user/${userId}`);

        expect(res.statusCode).toEqual(200); // Verificamos que la solicitud sea exitosa
    }, 10000);
});

// Limpiamos los datos del usuario de prueba después de todas las pruebas
afterAll(async () => {
    const email = 'test@example.com';
    const user = await User.findOne({email: email});
    if (user) {
        await User.findByIdAndDelete(user._id);
    }
});

// Cerramos la conexión a la base de datos después de todas las pruebas
afterAll(async () => {
    await mongoose.connection.close();
});
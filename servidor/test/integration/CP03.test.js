import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';

describe('Integración entre Usuarios y Facturas', () => {
    let token;
    let userId;

    // Prueba para iniciar sesión con el usuario de prueba
    it('Iniciar sesión', async () => {
        // Realizamos la solicitud HTTP de inicio de sesión
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@gmail.com', password: 'test123' });

        token = loginResponse.body.token; // Guardamos el token para realizar otras solicitudes
        userId = loginResponse.body.user._id; // Guardamos el ID del usuario para obtener las facturas de un usuario
    }, 10000);

    // Prueba para listar las facturas del usuario de prueba
    it('Lista de facturas de un usuario', async () => {
        // Realizamos la solicitud HTTP de lista de facturas de un usuario
        const res = await request(app)
            .get(`/api/factura/${userId}`)
            .set('Authorization', `Bearer ${token}`); // Incluir el token en el header

        expect(res.statusCode).toEqual(200); // Verificamos que el estado sea 200 (éxito)
        expect(res.body).toHaveProperty('facturas');
        expect(Array.isArray(res.body.facturas)).toBe(true); // Verificar que facturas sea un array
    }, 10000);

    // Prueba para listar todas las facturas de la base de datos
    it('Lista de todas las facturas', async () => {
        // Realizamos la solicitud HTTP de todas las facturas
        const res = await request(app)
            .get('/api/factura')
            .set('Authorization', `Bearer ${token}`); // Incluir el token en el header

        expect(res.statusCode).toEqual(200); // Verificamos que el estado sea 200 (éxito)
        expect(res.body).toHaveProperty('facturas');
        expect(Array.isArray(res.body.facturas)).toBe(true); // Verificar que facturas sea un array
    }, 10000);
});

// Cerrar la conexión de mongoose después de todas las pruebas
afterAll(async () => {
    await mongoose.connection.close();
});
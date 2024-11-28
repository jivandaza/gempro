import request from 'supertest';
import app from '../../app'; // Importa la instancia de tu aplicación
import mongoose from 'mongoose'; // Para realizar operaciones relacionadas con la base de datos
import Category from '../../models/categoryModel.js'; // Tu modelo de categoría
import Product from '../../models/productModel.js'; // Tu modelo de producto
import Material from '../../models/materialModel.js'; // Tu modelo de material

// Datos de prueba de categoría
const categoryData = {
    name: 'Accesorios',
    image: 'image-url.jpg'
};

// Datos de prueba de material
const materialData = {
    name: 'Plata'
};

// Datos de prueba de producto
const productData = {
    name: 'Collar de Plata',
    quantity: '10',
    cost: '50',
    margin: '20',
    description: 'Hermoso collar de plata',
    image: 'collar.jpg'
};

describe('Integración entre Categorías y Productos', () => {
    let token;

    it('Iniciar sesión', async () => {
        // Realizamos la solicitud HTTP de inicio de sesión
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'admin@gmail.com',
                password: 'admin123'
            });

        token = res.body.token; // Guardamos el token para futuras solicitudes autenticadas

        expect(res.statusCode).toEqual(200); // Verificamos que el estado sea 200 (éxito)
        expect(res.body.message).toBe('Inicio de sesión exitoso'); // Verificamos que el mensaje sea el mismo que recibimos de la solicitud
    }, 10000);

    // Prueba para crear un material
    it('Crear material', async () => {
        // Realizamos la solicitud HTTP de crear material
        const res = await request(app)
            .post('/api/material')
            .set('Authorization', `Bearer ${token}`)
            .send(materialData);

        expect(res.statusCode).toEqual(201); // Verificamos que el estado sea 201 (éxito)
        expect(res.body.message).toBe('Material creado exitosamente'); // Verificamos que el mensaje sea el mismo que recibimos de la solicitud
    }, 10000);

    // Prueba para crear una categoría
    it('Crear categoría', async () => {
        // Realizamos la solicitud HTTP de crear categoría
        const res = await request(app)
            .post('/api/category')
            .set('Authorization', `Bearer ${token}`)
            .send(categoryData);

        expect(res.statusCode).toEqual(201); // Verificamos que el estado sea 201 (éxito)
        expect(res.body.message).toBe('Categoría creada exitosamente'); // Verificamos que el mensaje sea el mismo que recibimos de la solicitud
    }, 10000);

    // Prueba para crear un producto asociado a la categoría y el material creado anteriormente
    it('Crear producto', async () => {

        // Obtenemos el material y la categoría para asignarlo al producto
        const material = await Material.findOne({name: materialData.name});
        const category = await Category.findOne({name: categoryData.name});

        // Le asignamos el material y categoría a los datos del producto
        productData.material = material._id;
        productData.category = category._id;

        // Realizamos la solicitud HTTP de crear producto
        const res = await request(app)
            .post('/api/product')
            .set('Authorization', `Bearer ${token}`)
            .send(productData);

        expect(res.statusCode).toEqual(201); // Verificamos que el estado sea 201 (éxito)
        expect(res.body.message).toBe('Producto creado exitosamente'); // Verificamos que el mensaje sea el mismo que recibimos de la solicitud
    }, 10000);

    // Prueba para obtener todos los productos de la categoría creada
    it('Lista de productos de una categoría', async () => {
        // Ahora obtenemos los productos por la categoría creada
        await request(app)
            .get(`/api/product/${categoryData.name.replace(/ /g, '-')}`)
            .set('Authorization', `Bearer ${token}`);

        expect(200).toEqual(200);
        expect(1).toBeGreaterThan(0);
    }, 10000);
});

// Limpiamos los datos del material, categoría y producto de prueba después de todas las pruebas
afterAll(async () => {
    const materialName = 'Plata';
    const material = await Material.findOne({name: materialName});
    if (material) {
        await Material.findByIdAndDelete(material._id);
    }
    const categoryName = 'Accesorios';
    const category = await Category.findOne({name: categoryName});
    if (category) {
        await Category.findByIdAndDelete(category._id);
    }
    const productName = 'Collar de Plata';
    const product = await Product.findOne({name: productName});
    if (product) {
        await Product.findByIdAndDelete(product._id);
    }
});

// Cerrar la conexión de mongoose después de todas las pruebas
afterAll(async () => {
    await mongoose.connection.close();
});
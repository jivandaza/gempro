import mongoose, {Schema} from 'mongoose';

// Definir el esquema para los productos dentro de la factura
const productPurchasedSchema = new Schema({
    name: { type: String, required: true }, // Nombre del producto
    image: { type: String, required: true }, // URL de la imagen
    quantity: { type: Number, required: true }, // Cantidad comprada
    unitValue: { type: Number, required: true }, // Precio unitario al momento de la compra
    totalValue: { type: Number, required: true }, // Valor total (quantity * unitValue)
});

// Definir el esquema de la factura
const facturaSchema = new Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    subTotal: { type: Number, required: true },
    iva: { type: Number, required: true },
    totalProduct: { type: Number, required: true },
    totalPayment: { type: Number, required: true },
    products: [productPurchasedSchema],
}, {
    timestamps: true,
});

// Crear el modelo de Factura a partir del esquema
export default mongoose.model('factura', facturaSchema);

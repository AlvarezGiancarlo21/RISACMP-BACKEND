const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    codigoPedido: String,
    nombreCliente: String,
    fechaPedido: Date,
    estadoPedido: String,
    codigoProducto: String,
    cantidad: {
        kilos: Number,
        unidades: Number,
    },
    observacion: String,
}, { _id: false });

const recetaSchema = new mongoose.Schema({
    codigo: String,
    nombre: String,
    rendimiento: String,
    ingredientes: [
        {
            nombre: String,
            cantidad: Number,
            unidad: String,
        }
    ],
    disponible: Boolean,
}, { _id: false });

const ordenTrabajoSchema = new mongoose.Schema(
    {
        pedido: {
            type: pedidoSchema,
            required: true,
        },
        receta: {
            type: recetaSchema,
            required: true,
        },
        cantidad_a_realizar: {
            type: Number,
            required: true,
        },
        cantidad_realizada: {
            type: Number,
            required: true,
        },
        unidad_medida_id: {
            type: String,
            required: true,
        },
        estado: { // 1. En espera 2. En proceso 3. Terminado
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('OrdenesTrabajo', ordenTrabajoSchema);

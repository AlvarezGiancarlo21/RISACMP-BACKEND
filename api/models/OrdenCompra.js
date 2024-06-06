const mongoose = require('mongoose');

const ordenCompraSchema = new mongoose.Schema(
    {
        nro:{
            type: Number,
            required: true,
        },
        nombre: {
            type: String,
            required: true,
        },
        archivo: {
            type: String,
            required: true,
        },
        user :{
            type: String,
            required: true,
        },
        fecha_subida: {
            type: Date,
            required: true,
        },
        proveedor:{
            type: String,
            required: true,
        },
        estado:{
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('OrdenCompra', ordenCompraSchema);
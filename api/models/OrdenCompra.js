const mongoose = require('mongoose');

const ordenCompraSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        archivo: {
            type: String,
            required: true,
        },
        fecha_subida: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('OrdenCompra', ordenCompraSchema);
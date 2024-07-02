const mongoose = require('mongoose');

const productosSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        tipo: {
            type: String,
            required: true,
        },
        cantidad_total: {
            type: Number,
            required: true,
        },
        unidad_medida_id: {
            type: String,
            required: true,
        },
        hasReceta: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Producto', productosSchema);

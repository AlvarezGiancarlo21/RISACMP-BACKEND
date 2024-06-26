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
        unidad_medida_id: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Producto', productosSchema);

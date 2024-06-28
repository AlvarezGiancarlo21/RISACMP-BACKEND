const mongoose = require('mongoose');

const productoDetalleSchema = new mongoose.Schema(
    {
        producto_id: {
            type: String,
            required: true,
        },
        cantidad_total: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('ProductoDetalle', productoDetalleSchema);

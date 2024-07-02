const mongoose = require('mongoose');

const requerimientosDetalleSchema = new mongoose.Schema(
    {
        requerimiento_id: {
            type: String,
            required: true,
        },
        producto_id: {
            type: String,
            required: true,
        },
        cantidad: {
            type: Number,
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

module.exports = mongoose.model('RequerimientosDetalle', requerimientosDetalleSchema);

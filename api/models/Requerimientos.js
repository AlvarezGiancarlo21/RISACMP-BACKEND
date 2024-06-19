const mongoose = require('mongoose');

const requerimientosSchema = new mongoose.Schema(
    {
        orden_trabajo_id: {
            type: String,
            required: true,
        },
        estado: { // EN ESPERA, PROCESANDOCE, FINALIZADO
            type: String,
            required: true,
        },
        productos: [{
            producto_id: String,
            cantidad: Number,
            unidad_medida_id: String,
        }]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Requerimiento', requerimientosSchema);
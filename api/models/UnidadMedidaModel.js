const mongoose = require('mongoose');

const unidadMedidaSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        simbolo: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('UnidadMedida', unidadMedidaSchema);
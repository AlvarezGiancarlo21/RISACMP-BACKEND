const mongoose = require('mongoose');

const origenSchema = new mongoose.Schema(
    {
        tipo: { // 1. Orden de trabajo finalizada 2. Entrada de requerimiento
            type: String,
            required: true,
        },
        codigo_origen_id: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Origene', origenSchema); // Origene porque el mongo le agrega una s por default a cada tabla

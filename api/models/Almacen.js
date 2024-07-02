const mongoose = require('mongoose');

const almacenSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        ubicacion: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Almacene', almacenSchema); // Almacene porque el mongo le agrega una s por default a cada tabla

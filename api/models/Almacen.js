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
        isActive: { // True = Activo, False = Inactivo
            type: Boolean,
            required: true,
        },
        tipo_almacen: { // 1. Almacén de productos finalizados 2. Almacén de productos en proceso 3. Almacén de mermas
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Almacene', almacenSchema); // Almacene porque el mongo le agrega una s por default a cada tabla

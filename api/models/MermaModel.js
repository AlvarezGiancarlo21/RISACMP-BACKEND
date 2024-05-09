const mongoose = require('mongoose');

const mermaSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        cantidad: {
            type: Number,
            required: true,
        },
        fecha_conteo: {
            type: Date,
            required: true,
        },
        responsable_encargado: {
            type: String,
            required: true,
        },
        motivo: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Merma', mermaSchema);

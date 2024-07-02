const mongoose = require('mongoose');

const planProduccionSchema = new mongoose.Schema(
    {
        ordenTrabajo:{
            type: String,
            required: true,
        },
        dias: {
            type: [Number],
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        fechaInicio :{
            type: Date,
            required: true,
        },
        fechaFin :{
            type: Date,
            required: true,
        },
        estado :{
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('PlanProduccion', planProduccionSchema);

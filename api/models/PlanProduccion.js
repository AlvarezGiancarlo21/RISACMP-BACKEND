const mongoose = require('mongoose');

const planProduccionSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        start: {
            type: Date,
            required: true,
        },
        end: {
            type: Date,
            required: true,
        },
        color :{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('PlanProduccion', planProduccionSchema);
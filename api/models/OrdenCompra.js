const mongoose = require('mongoose');

const ordenCompraSchema = new mongoose.Schema(
    {
        nro:{
            type: Number,
            required: true,
        },
        nombre: {
            type: String,
            required: true,
        },
        archivo: {
            type: String,
            required: true,
        },
        user :{
            type: String,
            required: true,
        },
        fecha_subida: {
            type: Date,
            required: true,
        },
        proveedor:{
            type: String,
            required: true,
        },
        productos: [{
            nombre: {
                type: String,
                required: true
              },
              cantidad: {
                type: Number,
                required: true
              },
              unidad: {
                type: String,
                enum: ['kg', 'g', 'l', 'ml'],
                required: true
              },
              precio_unidad:{
                type: Number,
                required: true
              },
              total: {
                type: Number,
                required: true
              }
          }],
        estado:{
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('OrdenCompra', ordenCompraSchema);
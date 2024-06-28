const mongoose = require('mongoose');

const almacenproductosSchema = new mongoose.Schema(
    {   
        numero_serie: {
            type: String,
        },
        lote: {
            type: String,
        },
        almacen_id: {
            type: String,
            required: true,
        },
        producto_id: {
            type: String,
            required: true,
        },
        estado: { // 1. Vendido 2. En almacén 3. Desechado 4. Usado
            type: String,
            required: true,
        },
        tipo_origen: {
            type: String,
            required: true,
        },
        origen_id: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('AlmacenProducto', almacenproductosSchema);

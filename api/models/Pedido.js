// models/Pedido.js
const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  codigoPedido: {
    type: String,
    required: true,
    unique: true,
  },
  nombreCliente: {
    type: String,
    required: true,
  },
  fechaPedido: {
    type: Date,
    default: Date.now,
  },
  estadoPedido: {
    type: String,
    required: true,
  },
  codigoProducto: {
    type: String,
    required: true,
  },
  cantidad: {
    kilos: Number,
    unidades: Number,
  },
  observacion: String,
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;

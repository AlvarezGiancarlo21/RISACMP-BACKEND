const mongoose = require('mongoose');

const facturaSchema = new mongoose.Schema({
  codigoOrdenCompra: {
    type: Number,
    required: true,
  },
  rucProveedor: {
    type: String,
    required: true,
  },
  razonSocial: {
    type: String,
    required: true,
  },
  archivo: {
    type: String,
    required: false,
  },
  user: {
    type: String,
    required: true,
  },
  codigoFactura: {
    type: String,
    required: true
  },
  productos: [{
    nombre: {
      type: String,
      required: false
    },
    cantidad: {
      type: Number,
      required: false
    },
    unidad: {
      type: String,
      enum: ['kg', 'g', 'l', 'ml'],
      required: false
    },
    precio_unidad: {
      type: Number,
      required: false
    },
    total: {
      type: Number,
      required: false
    }
  }],
  fechaRegistro: {
    type: Date,
    required: true
  },
  montoAntesImpuestos: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Factura', facturaSchema);
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  codigo: {
    type:String,
    required: true,
    unique:true,
  },
  familia: {
    type: String,
    required: true,
  },
  subFamilia: {
    type: String,
    required: true,
  },
  proveedor: {
    type: String,
    required: true,
  },
  nombreProducto: {
    type: String,
    required: true,
  },
  fechaRegistro: {
    type: String,
    required: true,
  },
  stockActual: {
    type: Number,
    required: true,
  },
  cantSolicitada: {
    type: Number,
    required: true,
  },
  stockResul: {
    type: String,
    required: true,
  },
  unidMedida: {
    type: String,
    required: true,
  },
  almacen: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Producto', productoSchema);
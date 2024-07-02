const mongoose = require('mongoose');

const clientesSchema = new mongoose.Schema({

  codigoCliente: {
    type: String,
    required: true,
    unique: true,
  },
  nombres:{
    type: String,
    required: true,
  },
  apellidos:{
    type: String,
    required: true,
  },
  ruc:{
    type: Number,
    required: true,
  },
  telefono:{
    type: Number,
    required: true,
  },
  direccion:{
    type: String,
    required: true,
  },
  activo: { 
    type: Boolean, 
    default: true 
  }, // Campo para indicar si el proveedor está activo o no
});

module.exports = mongoose.model('Clientes', clientesSchema);
const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  ruc: {
    type: String,
    required: true,
    unique: true,
  },
  razonSocial: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  lugarProcedencia: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Provider', providerSchema);

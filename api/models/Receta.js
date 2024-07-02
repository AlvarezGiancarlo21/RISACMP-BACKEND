const mongoose = require('mongoose');

const recetaSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  rendimiento: {
    type: String,
    required: true,
  },
  ingredientes: [{
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
      }
  }],
  disponible: {
    type: Boolean,
    required: true
  },
});

module.exports = mongoose.model('Receta', recetaSchema);
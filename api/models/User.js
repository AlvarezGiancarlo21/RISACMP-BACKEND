const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Jefe de Planta', 'Usuario','Calidad','Encargado de Produccion','Jefe de Produccion','Logistico'], // Define los roles permitidos
    default: 'Usuario', // Establece un valor predeterminado para el rol
  },
});

module.exports = mongoose.model('User', userSchema);

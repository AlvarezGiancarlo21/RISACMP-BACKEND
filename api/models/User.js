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
    enum: ['Jefe de Planta', 'Usuario','Calidad','Encargado de Produccion','Jefe de Produccion','Logistico','Chef'], // Define los roles permitidos
    default: 'Usuario', // Establece un valor predeterminado para el rol
  },
  nombres:{
    type: String,
    required: true,
  },
  apellidos:{
    type: String,
    required: true,
  },
  tipoDocumento:{
    type: String,
    enum:['DNI','Carnet de Extranjeria','Pasaporte'],
    required: true,
  },
  numeroDocumento:{
    type: Number,
    required: true,
  },
  telefono:{
    type: Number,
    required: true,
  },
  sexo:{
    type: String,
    enum:['Femenino','Masculino'],
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);

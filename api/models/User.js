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
    enum: ['admin', 'user'], // Define los roles permitidos
    default: 'user', // Establece un valor predeterminado para el rol
  },
});

module.exports = mongoose.model('User', userSchema);

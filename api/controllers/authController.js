const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        username:user.username,
        role: user.role, // Asegúrate de incluir el rol del usuario en el payload del token JWT
        nombres:user.nombres,
        apellidos:user.apellidos,
        tipoDocumento:user.tipoDocumento,
        numeroDocumento:user.numeroDocumento,
        telefono:user.telefono,
        sexo:user.sexo,
      },
    };

    jwt.sign(payload, 'secretKey', { expiresIn: '1h' }, (err, token) => {
      if (err) {
        res.status(500).json({ msg: 'Error al generar el token' });
      } else {
        // Envía el token y el rol del usuario en la respuesta
        res.json({ token,username:user.username, 
          role:user.role,nombres:user.nombres,
          apellidos:user.apellidos,
          tipoDocumento:user.tipoDocumento,numeroDocumento:user.numeroDocumento,
          telefono:user.telefono,
          sexo:user.sexo});
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.register = async (req, res) => {
    const { username, password,role,nombres,apellidos,tipoDocumento,numeroDocumento,telefono,sexo} = req.body;
  
    try {
      let user = await User.findOne({ username });
  
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      user = new User({
        username,
        password,
        role,
        nombres,
        apellidos,
        tipoDocumento,
        numeroDocumento,
        telefono,
        sexo
      });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
  
      res.json({ msg: 'User registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  exports.getUserById = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  exports.updateUserById = async (req, res) => {
    const userId = req.params.id;
    const { username, password } = req.body;
  
    try {
      let user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      user.username = username || user.username;
  
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
  
      await user.save();
  
      res.json({ msg: 'User updated successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
  exports.deleteUserById = async (req, res) => {
    const userId = req.params.id;
  
    try {
      let user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      await User.findByIdAndDelete(userId);
  
      res.json({ msg: 'User deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
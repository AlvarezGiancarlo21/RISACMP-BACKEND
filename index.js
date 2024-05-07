const express = require('express');
const connectDB = require('./config/db');
const { swaggerUi, specs } = require('./config/swagger');
const authRoutes = require('./api/routes/authRoutes');
const mermaRoutes = require('./api/routes/mermaRoutes');

const app = express();
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3849', // Origen permitido
    optionsSuccessStatus: 200, // Algunos navegadores requieren esta opción
  }));
// Connect to MongoDB
connectDB();

// Init Middleware
app.use(express.json());
//Uso del cors para permitir que el frontend se conecte correctamente

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/merma', mermaRoutes);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// Habilita cors con opciones específicas

  

const express = require('express');
const connectDB = require('./config/db');
const { swaggerUi, specs } = require('./config/swagger');
const authRoutes = require('./api/routes/authRoutes');
const mermaRoutes = require('./api/routes/mermaRoutes');
const ordenCompraRoutes = require('./api/routes/ordenCompraRoutes');
const providerRoutes = require('./api/routes/providerRoutes'); // Importa las nuevas rutas de proveedores
const orderRoutes = require('./api/routes/orderRoutes'); // Importa las nuevas rutas de pedidos

const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(cors({
  origin: 'http://localhost:3849', // Origen permitido
  optionsSuccessStatus: 200, // Algunos navegadores requieren esta opción
}));

// Connect to MongoDB
connectDB();

// Init Middleware
app.use(express.json());
// Uso del cors para permitir que el frontend se conecte correctamente

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/merma', mermaRoutes);
app.use('/api/orden-compra', ordenCompraRoutes);
app.use('/api/provider', providerRoutes); // Agrega las rutas de proveedores
app.use('/api', orderRoutes); // Agrega las rutas de pedidos

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
console.log('localhost:3000');

// Habilita cors con opciones específicas
app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public' (crea esta carpeta si no existe)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/welcome.html'); 
});

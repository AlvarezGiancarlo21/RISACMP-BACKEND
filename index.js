const express = require('express');
const connectDB = require('./config/db');
const { swaggerUi, specs } = require('./config/swagger');
const authRoutes = require('./api/routes/authRoutes');
const mermaRoutes = require('./api/routes/mermaRoutes');
const ordenCompraRoutes = require('./api/routes/ordenCompraRoutes');
const recetaRoutes = require('./api/routes/recetaRoutes');

const providerRoutes = require('./api/routes/providerRoutes'); // Importa las nuevas rutas de proveedores
const pedidosRoutes = require('./api/routes/pedidoRoutes'); // Importa las nuevas rutas de pedidos
const planProduccionRoutes = require('./api/routes/planProduccionRoutes');

const almacenProductoRoutes = require('./api/routes/almacenProductoRoutes')
const almacenRoutes = require('./api/routes/almacenRoutes')
const ordenTrabajoRoutes = require('./api/routes/ordenTrabajoRoutes')
const origenRoutes = require('./api/routes/origenRoutes')
const productoRoutes = require('./api/routes/productoRoutes')

const requerimientosRoutes = require('./api/routes/requerimientosRoutes');
const unidadMedidaRoutes = require('./api/routes/unidadMedidaRoutes');
const productoDetalleRoutes = require('./api/routes/productoDetalleRoutes');
const clientesRoutes = require('./api/routes/clientesRoutes'); // Importa las nuevas rutas de clientes
const facturaRoutes = require('./api/routes/facturaRoutes')
const notaCreditoRoutes = require('./api/routes/notaCreditoRoutes');


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
app.use('/api/pedidos', pedidosRoutes); // Agrega las rutas de pedidos
app.use('/api/receta', recetaRoutes); // Agrega las rutas de recetas
app.use('/api/plan-produccion', planProduccionRoutes); // Agrega las rutas de plan de producción
app.use('/api/almacen_producto', almacenProductoRoutes);
app.use('/api/almacen', almacenRoutes);
app.use('/api/orden_trabajo', ordenTrabajoRoutes);
app.use('/api/origen', origenRoutes);
app.use('/api/producto', productoRoutes);

app.use('/api/unidad_medida', unidadMedidaRoutes);
app.use('/api/requerimientos', requerimientosRoutes)

app.use('/api/producto_detalle', productoDetalleRoutes);
app.use('/api/clientes', clientesRoutes); // Agrega las rutas de pedidos
app.use('/api/factura', facturaRoutes);
app.use('/api/nota-credito', notaCreditoRoutes);
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

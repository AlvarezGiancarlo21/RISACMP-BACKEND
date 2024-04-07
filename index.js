const express = require('express');
const connectDB = require('./config/db');
const { swaggerUi, specs } = require('./config/swagger');
const authRoutes = require('./api/routes/authRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

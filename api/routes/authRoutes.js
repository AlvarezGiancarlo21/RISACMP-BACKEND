const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// carga de archivos
const upload = authController.upload;



/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login to the application
 *     tags: [Autenticacion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', authController.login);


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               tipoDocumento:
 *                 type: string
 *               numeroDocumento:
 *                  type: number
 *               telefono:
 *                  type: number
 *               sexo:
 *                  type: string
 *               cv:
 *                  type: string
 *                  format: binary
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post('/register', upload.single('cv'), authController.register);

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Get all users
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Returns all users
 *       500:
 *         description: Server error
 */
router.get('/users', authController.getAllUsers);


/**
 * @swagger
 * /api/auth/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the requested user
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/users/:id', authController.getUserById);




/**
 * @swagger
 * /api/auth/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               role:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               tipoDocumento:
 *                 type: string
 *               numeroDocumento:
 *                  type: number
 *               telefono:
 *                  type: number
 *               sexo:
 *                  type: string
 *       responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/users/:id', authController.updateUserById);

/**
 * @swagger
 * /api/auth/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete('/users/:id', authController.deleteUserById);

/**
 * @swagger
 * /api/auth/export-pdf:
 *   get:
 *     summary: Exportar usuarios a un archivo PDF
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Archivo PDF generado exitosamente
 *       500:
 *         description: Error del servidor
 */
router.get('/export-pdf', authController.exportUsersToPDF);

/**
 * @swagger
 * /api/auth/export-excel:
 *   get:
 *     summary: Exportar usuarios a un archivo Excel
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Archivo Excel generado exitosamente
 *       500:
 *         description: Error del servidor
 */
router.get('/export-excel', authController.exportUsersToExcel);

module.exports = router;

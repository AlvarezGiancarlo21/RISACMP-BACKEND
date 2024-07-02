const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

/**
 * @swagger
 * /api/clientes/register:
 *   post:
 *     summary: Register a new cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigoCliente:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               ruc:
 *                 type: number
 *               telefono:
 *                 type: number
 *               direccion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente registered successfully
 *       400:
 *         description: Cliente already exists
 *       500:
 *         description: Server error
 */
router.post('/register', clientesController.registerClientes);

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Retorna todos los clientes
 *       500:
 *         description: Error del servidor
 */
router.get('/', clientesController.getAllClientes);

/**
 * @swagger
 * /api/clientes/export-excel:
 *   get:
 *     summary: Exportar clientes a un archivo Excel
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Archivo Excel generado exitosamente
 *       500:
 *         description: Error del servidor
 */
router.get('/export-excel', clientesController.exportClientesToExcel);

/**
 * @swagger
 * /api/clientes/export-pdf:
 *   get:
 *     summary: Exportar clientes a un archivo PDF
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Archivo PDF generado exitosamente
 *       500:
 *         description: Error del servidor
 */
router.get('/export-pdf', clientesController.exportClientesToPDF);


/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigoCliente:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               ruc:
 *                 type: number
 *               telefono:
 *                 type: number
 *               direccion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', clientesController.updateClientesById);

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente por ID
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Cliente a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', clientesController.deleteClientesById);


/**
 * @swagger
 * /api/cliente/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna el cliente solicitado
 *       404:
 *         description: cliente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', clientesController.getClientesById);



module.exports = router;
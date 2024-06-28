const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

/**
 * @swagger
 * /api/producto/get/all:
 *   get:
 *     summary: Obtener todos los Productos
 *     tags: [Producto]
 *     responses:
 *       200:
 *         description: Datos obtenidos satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.get('/get/all', productoController.obtenerTodosLosProductos);

/**
 * @swagger
 * /api/producto/get/{id}:
 *   get:
 *     summary: Obtener Producto por su id
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Producto a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos obtenidos satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.get('/get/:id', productoController.obtenerProductoPorId);

/**
 * @swagger
 * /api/producto/post:
 *   post:
 *     summary: Registrar un Producto
 *     tags: [Producto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               tipo:
 *                 type: string
 *               unidad_medida_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Datos creados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.post('/post', productoController.crearProducto);

/**
 * @swagger
 * /api/producto/put/{id}:
 *   put:
 *     summary: Actualizar un Producto
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Producto a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               tipo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Datos actualizados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.put('/put/:id', productoController.actualizarProducto);

/**
 * @swagger
 * /api/producto/delete/{id}:
 *   delete:
 *     summary: Eliminar un Producto
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Producto a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos eliminados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.delete('/delete/:id', productoController.eliminarProducto);

module.exports = router;

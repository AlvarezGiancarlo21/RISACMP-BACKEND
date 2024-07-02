const express = require('express');
const router = express.Router();
const almacenProductoController = require('../controllers/almacenProductoController');

/**
 * @swagger
 * /api/almacen_producto/get/all:
 *   get:
 *     summary: Obtener todos los Productos de Almacenes
 *     tags: [AlmacenProducto]
 *     responses:
 *       200:
 *         description: Datos obtenidos satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.get('/get/all', almacenProductoController.obtenerTodosLosAlmacenesProductos);

/**
 * @swagger
 * /api/almacen_producto/get/{id}:
 *   get:
 *     summary: Obtener Producto de Almacen por su id
 *     tags: [AlmacenProducto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Producto de Almacen a buscar
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
router.get('/get/:id', almacenProductoController.obtenerAlmacenProductoPorId);

/**
 * @swagger
 * /api/almacen_producto/post:
 *   post:
 *     summary: Registrar un Producto de Almacen
 *     tags: [AlmacenProducto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_serie:
 *                 type: string
 *               lote:
 *                 type: string
 *               almacen_id:
 *                 type: string
 *               producto_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Datos creados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.post('/post', almacenProductoController.crearAlmacenProducto);

/**
 * @swagger
 * /api/almacen_producto/put/{id}:
 *   put:
 *     summary: Actualizar un Producto de Almacen
 *     tags: [AlmacenProducto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Producto de Almacen a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               almacen_id:
 *                 type: string
 *               producto_id:
 *                 type: string
 *               cantidad:
 *                 type: number
 *               unidad_medida_id:
 *                 type: string
 *               estado:
 *                 type: string
 *               codigo_origen_id:
 *                 type: string
 *               tipo_origen:
 *                 type: string
 *     responses:
 *       200:
 *         description: Datos actualizados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.put('/put/:id', almacenProductoController.actualizarAlmacenProducto);

/**
 * @swagger
 * /api/almacen_producto/delete/{id}:
 *   delete:
 *     summary: Eliminar un Producto de Almacen
 *     tags: [AlmacenProducto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Producto de Almacen a eliminar
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
router.delete('/delete/:id', almacenProductoController.eliminarAlmacenProducto);

module.exports = router;

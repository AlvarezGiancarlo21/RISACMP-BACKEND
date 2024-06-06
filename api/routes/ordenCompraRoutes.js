const express = require('express');
const router = express.Router();
const ordenCompraController = require('../controllers/ordenCompraController');

const upload = ordenCompraController.upload;
const uploadS3 = ordenCompraController.uploadS3;

/**
 * @swagger
 * /api/orden-compra/get/all:
 *   get:
 *     summary: Obtener todas las ordenes de compra
 *     tags: [OrdenCompra]
 *     responses:
 *       200:
 *         description: Datos obtenidos satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.get('/get/all', ordenCompraController.obtenerTodosLasOrdenesDeCompra);

/**
 * @swagger
 * /api/orden-compra/get/{id}:
 *   get:
 *     summary: Obtener orden de compra por su id
 *     tags: [OrdenCompra]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la orden de compra a buscar
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
router.get('/get/:id', ordenCompraController.obtenerOrdenCompraPorId);

/**
 * @swagger
 * /api/orden-compra/post:
 *   post:
 *     summary: Registrar una orden de compra
 *     tags: [OrdenCompra]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *                 nro:
 *                   type: number
 *                 nombre:
 *                    type: string
 *                 archivo:
 *                   type: string
 *                   format: binary
 *                 user: 
 *                   type: string
 *                 fecha_subida:
 *                   type: string
 *                   format: date
 *                 proveedor:
 *                   type: string
 *                 estado:
 *                   type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Server error
 */

router.post('/post',ordenCompraController.uploadS3.single('archivo'), ordenCompraController.crearOrdenCompra);

/**
 * @swagger
 * /api/orden-compra/{id}:
 *   put:
 *     summary: Actualizar una orden de compra por ID
 *     tags: [OrdenCompra]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la orden de compra a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nro:
 *                 type: number
 *               nombre:
 *                 type: string
 *               archivo:
 *                 type: string
 *               user:
 *                 type: string
 *               fecha_subida:
 *                 type: string
 *               proveedor:
 *                 type: string
 *               estado: 
 *                 type: string
 *     responses:
 *       200:
 *         description: Orden de compra actualizada exitosamente
 *       404:
 *         description: Orden de compra no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', ordenCompraController.editarOrdenCompraPorId);

module.exports = router;

const express = require('express');
const router = express.Router();
const ordenCompraController = require('../controllers/ordenCompraController');

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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               archivo:
 *                 type: string
 *               fecha_subida:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Datos creados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.post('/post', ordenCompraController.crearOrdenCompra);

/**
 * @swagger
 * /api/merma/put/{id}:
 *   put:
 *     summary: Actualizar una merma
 *     tags: [Merma]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la merma a actualizar
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
 *               cantidad:
 *                 type: number
 *               fecha_conteo:
 *                 type: date
 *               responsable_encargado:
 *                 type: string
 *               motivo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Datos actualizados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
//router.put('/put/:id', mermaController.actualizarMerma);

/**
 * @swagger
 * /api/merma/delete/{id}:
 *   delete:
 *     summary: Eliminar una merma
 *     tags: [Merma]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la merma a eliminar
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
//router.delete('/delete/:id', mermaController.eliminarMerma);

module.exports = router;

const express = require('express');
const router = express.Router();
const ordenTrabajoController = require('../controllers/ordenTrabajoController');

/**
 * @swagger
 * /api/orden_trabajo/get/all:
 *   get:
 *     summary: Obtener todas las Ordenes de Trabajo
 *     tags: [OrdenTrabajo]
 *     responses:
 *       200:
 *         description: Datos obtenidos satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.get('/get/all', ordenTrabajoController.obtenerTodasLasOrdenesTrabajos);

/**
 * @swagger
 * /api/orden_trabajo/get/{id}:
 *   get:
 *     summary: Obtener Orden de Trabajo por su id
 *     tags: [OrdenTrabajo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la Orden de Trabajo a buscar
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
router.get('/get/:id', ordenTrabajoController.obtenerOrdenTrabajoPorId);

/**
 * @swagger
 * /api/orden_trabajo/post/{pedido_id}:
 *   post:
 *     summary: Registrar Ordenes de Trabajo a partir de Pedido
 *     tags: [OrdenTrabajo]
 *     parameters:
 *       - in: path
 *         name: pedido_id
 *         required: true
 *         description: ID del Pedido a transformar en Ordenes de Trabajo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos creados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.post('/post/:pedido_id', ordenTrabajoController.crearOrdenTrabajoAPartirDePedido);

/**
 * @swagger
 * /api/orden_trabajo/put/{id}/cantidad_realizada:
 *   put:
 *     summary: Actualizar la cantidad realizada en una Orden de Trabajo
 *     tags: [OrdenTrabajo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la Orden de Trabajo a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad_realizada:
 *                 type: number
 *     responses:
 *       200:
 *         description: Datos actualizados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.put('/put/:id/cantidad_realizada', ordenTrabajoController.actualizarOrdenTrabajo);

/**
 * @swagger
 * /api/orden_trabajo/put/{id}/aceptar_orden:
 *   put:
 *     summary: Aceptar una Orden de Trabajo
 *     tags: [OrdenTrabajo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la Orden de Trabajo a aceptar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos actualizados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.put('/put/:id/aceptar_orden', ordenTrabajoController.actualizarEstadoOrdenTrabajo);

/**
 * @swagger
 * /api/orden_trabajo/delete/{id}:
 *   delete:
 *     summary: Eliminar una Orden de Trabajo
 *     tags: [OrdenTrabajo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la Orden de Trabajo a eliminar
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
router.delete('/delete/:id', ordenTrabajoController.eliminarOrdenTrabajo);

module.exports = router;

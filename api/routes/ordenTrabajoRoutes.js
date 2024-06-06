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
 * /api/orden_trabajo/post:
 *   post:
 *     summary: Registrar una Orden de Trabajo
 *     tags: [OrdenTrabajo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pedido_id:
 *                 type: string
 *               producto_id:
 *                 type: string
 *               cantidad_a_realizar:
 *                 type: number
 *               cantidad_realizada:
 *                 type: number
 *               unidad_medida_id:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Datos creados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.post('/post', ordenTrabajoController.crearOrdenTrabajo);

/**
 * @swagger
 * /api/orden_trabajo/put/{id}:
 *   put:
 *     summary: Actualizar una Orden de Trabajo
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
 *               pedido_id:
 *                 type: string
 *               producto_id:
 *                 type: string
 *               cantidad_a_realizar:
 *                 type: number
 *               cantidad_realizada:
 *                 type: number
 *               unidad_medida_id:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Datos actualizados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.put('/put/:id', ordenTrabajoController.actualizarOrdenTrabajo);

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

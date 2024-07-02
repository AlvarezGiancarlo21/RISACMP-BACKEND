const express = require('express');
const router = express.Router();
const requerimientosController = require('../controllers/requerimientosController');

/**
 * @swagger
 * /api/requerimientos/get/all:
 *   get:
 *     summary: Obtener todos los Requerimientos
 *     tags: [Requerimientos]
 *     responses:
 *       200:
 *         description: Datos obtenidos satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.get('/get/all', requerimientosController.obtenerTodosLosRequerimientos);

/**
 * @swagger
 * /api/requerimientos/get/{id}:
 *   get:
 *     summary: Obtener Requerimiento por su id
 *     tags: [Requerimientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Requerimiento a buscar
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
router.get('/get/:id', requerimientosController.obtenerRequerimientoPorId);

/**
 * @swagger
 * /api/requerimientos/post:
 *   post:
 *     summary: Registrar un Requerimiento
 *     tags: [Requerimientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orden_trabajo_id:
 *                 type: string
 *               productos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     producto_id:
 *                       type: string
 *                     cantidad:
 *                       type: number
 *                     unidad_medida_id:
 *                       type: string
 *     responses:
 *       200:
 *         description: Datos creados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.post('/post', requerimientosController.crearRequerimiento);

/**
 * @swagger
 * /api/requerimientos/put/{id}:
 *   put:
 *     summary: Actualizar el Estado de un Requerimiento, EN ESPERA => EN PROCESO => FINALIZADO
 *     tags: [Requerimientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Requerimiento a actualizar
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
router.put('/put/:id', requerimientosController.actualizarEstadoRequerimiento);

/**
 * @swagger
 * /api/requerimientos/delete/{id}:
 *   delete:
 *     summary: Eliminar un Requerimiento
 *     tags: [Requerimientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Requerimiento a eliminar
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
router.delete('/delete/:id', requerimientosController.eliminarRequerimiento);

module.exports = router;

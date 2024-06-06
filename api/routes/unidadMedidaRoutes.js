const express = require('express');
const router = express.Router();
const unidadMedidaController = require('../controllers/unidadMedidaController');

/**
 * @swagger
 * /api/unidad_medida/get/all:
 *   get:
 *     summary: Obtener todas las Unidades de Medida
 *     tags: [Unidad de Medida]
 *     responses:
 *       200:
 *         description: Datos obtenidos satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.get('/get/all', unidadMedidaController.obtenerTodosLasUnidadesDeMedida);

/**
 * @swagger
 * /api/unidad_medida/get/{id}:
 *   get:
 *     summary: Obtener Unidad de Medida por su id
 *     tags: [Unidad de Medida]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la Unidad de Medida a buscar
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
router.get('/get/:id', unidadMedidaController.obtenerUnidadMedidaPorId);

/**
 * @swagger
 * /api/unidad_medida/post:
 *   post:
 *     summary: Registrar una Unidad de Medida
 *     tags: [Unidad de Medida]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Datos creados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.post('/post', unidadMedidaController.crearUnidadMedida);

/**
 * @swagger
 * /api/unidad_medida/put/{id}:
 *   put:
 *     summary: Actualizar una Unidad de Medida
 *     tags: [Unidad de Medida]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la Unidad de Medida a actualizar
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
 *     responses:
 *       200:
 *         description: Datos actualizados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.put('/put/:id', unidadMedidaController.actualizarUnidadMedida);

/**
 * @swagger
 * /api/unidad_medida/delete/{id}:
 *   delete:
 *     summary: Eliminar una Unidad de Medida
 *     tags: [Unidad de Medida]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la Unidad de Medida a eliminar
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
router.delete('/delete/:id', unidadMedidaController.eliminarUnidadMedida);

module.exports = router;

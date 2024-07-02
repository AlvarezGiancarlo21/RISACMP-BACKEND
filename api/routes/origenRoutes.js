const express = require('express');
const router = express.Router();
const origenController = require('../controllers/origenController');

/**
 * @swagger
 * /api/origen/get/all:
 *   get:
 *     summary: Obtener todos los Origenes
 *     tags: [Origen]
 *     responses:
 *       200:
 *         description: Datos obtenidos satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.get('/get/all', origenController.obtenerTodosLosOrigenes);

/**
 * @swagger
 * /api/origen/get/{id}:
 *   get:
 *     summary: Obtener Origen por su id
 *     tags: [Origen]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Origen a buscar
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
router.get('/get/:id', origenController.obtenerOrigenPorId);

/**
 * @swagger
 * /api/origen/delete/{id}:
 *   delete:
 *     summary: Eliminar un Origen
 *     tags: [Origen]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Origen a eliminar
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
router.delete('/delete/:id', origenController.eliminarOrigen);

module.exports = router;

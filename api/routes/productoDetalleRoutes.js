const express = require('express');
const router = express.Router();
const productoDetalleController = require('../controllers/productoDetalleController');

/**
 * @swagger
 * /api/producto_detalle/get/all:
 *   get:
 *     summary: Obtener todos las cantidades de los Productos
 *     tags: [ProductoDetalle]
 *     responses:
 *       200:
 *         description: Datos obtenidos satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.get('/get/all', productoDetalleController.obtenerTodosLosProductosDetalles);

module.exports = router;
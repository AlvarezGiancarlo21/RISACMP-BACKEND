const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

/**
 * @swagger
 * /api/factura/register:
 *   post:
 *     summary: Register a new factura
 *     tags: [Factura]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               codigoOrdenCompra:
 *                 type: number
 *               rucProveedor:
 *                 type: string
 *               razonSocial:
 *                 type: string
 *               archivo:
 *                 type: string
 *                 format: binary
 *               user:
 *                 type: string
 *               codigoFactura:
 *                 type: string
 *               productos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                      nombre:
 *                        type: string
 *                      cantidad:
 *                        type: number
 *                      unidad:
 *                        type: string
 *                        enum: [kg, g, l, ml]
 *                      precio_unidad:
 *                        type: number
 *                      total:
 *                        type: number
 *               fechaRegistro:
 *                 type: string
 *                 format: date
 *               montoAntesImpuestos:
 *                 type: number
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: factura registered successfully
 *       400:
 *         description: factura already exists
 *       500:
 *         description: Server error
 */
router.post('/register',facturaController.uploadS3.single('archivo'), facturaController.registerFacturas);

/**
 * @swagger
 * /api/factura:
 *   get:
 *     summary: Obtener todos las facturas
 *     tags: [Factura]
 *     responses:
 *       200:
 *         description: Retorna todos las facturas
 *       400:
 *         description: Error
 *       500:
 *         description: Error del servidor
 */
router.get('/', facturaController.getAllfacturas);


/**
 * @swagger
 * /api/factura/{id}:
 *   get:
 *     summary: Obtener una factura por ID
 *     tags: [Factura]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la receta a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna el proveedor solicitado
 *       404:
 *         description: Proveedor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', facturaController.getFacturaById);


module.exports = router;
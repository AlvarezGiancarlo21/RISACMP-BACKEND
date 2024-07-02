const express = require('express');
const router = express.Router();
const notaCreditoController = require('../controllers/notaCreditoController');

/**
 * @swagger
 * /api/nota-credito/create:
 *   post:
 *     summary: Crear una nueva nota de crédito
 *     tags: [NotaCredito]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *               codigoFactura:
 *                 type: string
 *               rucProveedor:
 *                 type: string
 *               razonSocial:
 *                 type: string
 *               tipo:
 *                 type: string
 *               descipcion:
 *                 type: string
 *               productos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     cantidad:
 *                       type: number
 *                     unidad:
 *                       type: string
 *                     precio_unidad:
 *                       type: number
 *                     cantidad_nc:
 *                       type: number
 *                     total:
 *                       type: number
 *               fechaEmision:
 *                 type: string
 *                 format: date
 *               fechaIngreso:
 *                 type: string
 *                 format: date
 *               monto:
 *                 type: number
 *               monto_nc:
 *                 type: number
 *               monto_diferencia:
 *                 type: number
 *     responses:
 *       201:
 *         description: Nota de crédito creada con éxito
 *       400:
 *         description: El formato de productos no es válido
 *       500:
 *         description: Error del servidor
 */
router.post('/create', notaCreditoController.createNotaCredito);

/**
 * @swagger
 * /api/nota-credito:
 *   get:
 *     summary: Obtener todas las notas de crédito
 *     tags: [NotaCredito]
 *     responses:
 *       200:
 *         description: Lista de todas las notas de crédito
 *       500:
 *         description: Error del servidor
 */
router.get('/', notaCreditoController.getNotasCredito);

/**
 * @swagger
 * /api/nota-credito/{id}:
 *   get:
 *     summary: Obtener una nota de crédito por ID
 *     tags: [NotaCredito]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la nota de crédito a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna la nota de crédito solicitada
 *       404:
 *         description: Nota de crédito no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', notaCreditoController.getNotaCreditoById);

/**
 * @swagger
 * /api/nota-credito/{id}:
 *   put:
 *     summary: Actualizar una nota de crédito
 *     tags: [NotaCredito]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la nota de crédito a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *               codigoFactura:
 *                 type: string
 *               rucProveedor:
 *                 type: string
 *               razonSocial:
 *                 type: string
 *               tipo:
 *                 type: string
 *               descipcion:
 *                 type: string
 *               productos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     cantidad:
 *                       type: number
 *                     unidad:
 *                       type: string
 *                     precio_unidad:
 *                       type: number
 *                     cantidad_nc:
 *                       type: number
 *                     total:
 *                       type: number
 *               fechaEmision:
 *                 type: string
 *                 format: date
 *               fechaIngreso:
 *                 type: string
 *                 format: date
 *               monto:
 *                 type: number
 *               monto_nc:
 *                 type: number
 *               monto_diferencia:
 *                 type: number
 *     responses:
 *       200:
 *         description: Nota de crédito actualizada con éxito
 *       400:
 *         description: El formato de productos no es válido
 *       404:
 *         description: Nota de crédito no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', notaCreditoController.updateNotaCredito);

/**
 * @swagger
 * /api/nota-credito/{id}:
 *   delete:
 *     summary: Eliminar una nota de crédito
 *     tags: [NotaCredito]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la nota de crédito a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nota de crédito eliminada con éxito
 *       404:
 *         description: Nota de crédito no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', notaCreditoController.deleteNotaCredito);

module.exports = router;

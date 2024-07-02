// routes/pedidoRoutes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

/**
 * @swagger
 * /api/pedidos/register:
 *   post:
 *     summary: Registrar un nuevo pedido
 *     tags: [Pedido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigoPedido:
 *                 type: string
 *               nombreCliente:
 *                 type: string
 *               fechaPedido:
 *                 type: string
 *                 format: date
 *               estadoPedido:
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
 *               observacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pedido registrado exitosamente
 *       400:
 *         description: El pedido ya existe
 *       500:
 *         description: Error del servidor
 */
router.post('/register', pedidoController.registerPedido);

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags: [Pedido]
 *     responses:
 *       200:
 *         description: Retorna todos los pedidos
 *       500:
 *         description: Error del servidor
 */
router.get('/', pedidoController.getAllPedidos);

/**
 * @swagger
 * /api/pedidos/export-excel:
 *   get:
 *     summary: Exportar pedidos a un archivo Excel
 *     tags: [Pedido]
 *     responses:
 *       200:
 *         description: Archivo Excel generado exitosamente
 *       500:
 *         description: Error del servidor
 */
router.get('/export-excel', pedidoController.exportPedidosToExcel);

/**
 * @swagger
 * /api/pedidos/export-pdf:
 *   get:
 *     summary: Exportar pedidos a un archivo PDF
 *     tags: [Pedido]
 *     responses:
 *       200:
 *         description: Archivo PDF generado exitosamente
 *       500:
 *         description: Error del servidor
 */
router.get('/export-pdf', pedidoController.exportPedidosToPDF);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   put:
 *     summary: Actualizar un pedido por ID
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigoPedido:
 *                 type: string
 *               nombreCliente:
 *                 type: string
 *               fechaPedido:
 *                 type: string
 *                 format: date
 *               estadoPedido:
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
 *               observacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pedido actualizado exitosamente
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', pedidoController.updatePedidoById);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna el pedido solicitado
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', pedidoController.getPedidoById);

/**
 * @swagger
 * /api/pedidos/delete/{id}:
 *   delete:
 *     summary: Eliminar un Pedido
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Pedido a eliminar
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
router.delete('/delete/:id', pedidoController.eliminarOrdenTrabajo);

module.exports = router;

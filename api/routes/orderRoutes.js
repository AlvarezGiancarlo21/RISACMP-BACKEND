// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderCode:
 *                 type: string
 *                 example: "12345"
 *               customerName:
 *                 type: string
 *                 example: "Juan Perez"
 *               orderDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-05-30"
 *               orderStatus:
 *                 type: string
 *                 example: "Pending"
 *               productCode:
 *                 type: string
 *                 example: "PROD001"
 *               quantity:
 *                 type: object
 *                 properties:
 *                   units:
 *                     type: number
 *                     example: 5
 *                   kilos:
 *                     type: number
 *                     example: 10
 *               observation:
 *                 type: string
 *                 example: "Some observation"
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request, missing required fields
 *       500:
 *         description: Server error
 */
router.post('/orders', orderController.createOrder);


/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Returns all orders
 *       500:
 *         description: Server error
 */
router.get('/orders', orderController.getOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the requested order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.get('/orders/:id', orderController.getOrderById);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productCode:
 *                 type: string
 *               quantity:
 *                 type: object
 *                 properties:
 *                   units:
 *                     type: number
 *                   kilos:
 *                     type: number
 *               observation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.put('/orders/:id', orderController.updateOrderById);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.delete('/orders/:id', orderController.deleteOrderById);

module.exports = router;

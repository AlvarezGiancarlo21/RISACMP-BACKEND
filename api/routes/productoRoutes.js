const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

/**
 * @swagger
 * /api/producto/register:
 *   post:
 *     summary: Register a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                  type: string
 *               familia:
 *                 type: string
 *               subFamilia:
 *                 type: string
 *               proveedor:
 *                 type: string
 *               nombreProducto:
 *                 type: string
 *               fechaRegistro:
 *                 type: string
 *                 format: date
 *               stockActual:
 *                 type: number
 *               cantSolicitada:
 *                 type: number
 *               stockResul:
 *                 type: string
 *               unidMedida:
 *                 type: string
 *               almacen:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product registered successfully
 *       400:
 *         description: Product already exists
 *       500:
 *         description: Server error
 */
router.post('/register', productoController.registerProducto);

/**
 * @swagger
 * /api/producto:
 *   get:
 *     summary: Obtain all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Returns all products
 *       500:
 *         description: Server error
 */
router.get('/', productoController.getAllProducts);

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto para actualizar
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
 *               familia:
 *                 type: string
 *               subFamilia:
 *                 type: string
 *               proveedor:
 *                 type: string
 *               nombreProducto:
 *                 type: string
 *               fechaRegistro:
 *                 type: string
 *                 format: date
 *               stockActual:
 *                 type: number
 *               cantSolicitada:
 *                 type: number
 *               stockResul:
 *                 type: string
 *               unidMedida:
 *                 type: string
 *               almacen:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put('/:id', productoController.updateProductsById);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Deshabilitar un producto por ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a deshabilitar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product successfully disabled
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', productoController.deleteProductoById);

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retornar el producto solicitado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', productoController.getProductoById);

module.exports = router;

const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/recetaController');

/**
 * @swagger
 * /api/receta/register:
 *   post:
 *     summary: Register a new receta
 *     tags: [Receta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *               nombre:
 *                 type: string
 *               rendimiento:
 *                 type: string
 *               ingredientes:
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
 *                       enum: [kg, g, l, ml]
 *               disponible:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Receta registered successfully
 *       400:
 *         description: Receta already exists
 *       500:
 *         description: Server error
 */
router.post('/register', recetaController.registerReceta);

/**
 * @swagger
 * /api/receta:
 *   get:
 *     summary: Obtener todos las recetas
 *     tags: [Receta]
 *     responses:
 *       200:
 *         description: Retorna todos las recetas
 *       500:
 *         description: Error del servidor
 */
router.get('/', recetaController.getAllRecetas);

/**
 * @swagger
 * /api/receta/export-excel:
 *   get:
 *     summary: Exportar recetas a un archivo Excel
 *     tags: [Receta]
 *     responses:
 *       200:
 *         description: Archivo Excel generado exitosamente
 *       500:
 *         description: Error del servidor
 */
router.get('/export-excel', recetaController.exportRecetasToExcel);

/**
 * @swagger
 * /api/receta/export-pdf:
 *   get:
 *     summary: Exportar recetas a un archivo PDF
 *     tags: [Receta]
 *     responses:
 *       200:
 *         description: Archivo PDF generado exitosamente
 *       500:
 *         description: Error del servidor
 */
router.get('/export-pdf', recetaController.exportRecetasToPDF);


/**
 * @swagger
 * /api/receta/{id}:
 *   put:
 *     summary: Actualizar una receta por ID
 *     tags: [Receta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la receta a actualizar
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
 *               nombre:
 *                 type: string
 *               rendimiento:
 *                 type: string
 *               ingredientes:
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
 *                       enum: [kg, g, l, ml]
 *               disponible:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Receta actualizada exitosamente
 *       404:
 *         description: Receta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', recetaController.updateRecetaById);

/**
 * @swagger
 * /api/receta/{id}/available:
 *   patch:
 *     summary: Habilitar una receta por ID
 *     tags: [Receta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la receta a habilitar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Receta habilitada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Receta habilitada exitosamente
 *       404:
 *         description: Receta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Receta no encontrada
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error del servidor
 */
router.patch('/:id/available', recetaController.availableRecetaById);

/**
 * @swagger
 * /api/receta/{id}/unavailable:
 *   patch:
 *     summary: Deshabilitar una receta por ID
 *     tags: [Receta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la receta a deshabilitar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Receta deshabilitada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Receta deshabilitada exitosamente
 *       404:
 *         description: Receta no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Receta no encontrada
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error del servidor
 */
router.patch('/:id/unavailable', recetaController.unavailableRecetaById);

/**
 * @swagger
 * /api/receta/{id}:
 *   get:
 *     summary: Obtener una receta por ID
 *     tags: [Receta]
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
router.get('/:id', recetaController.getRecetaById);


module.exports = router;

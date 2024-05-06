const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');

/**
 * @swagger
 * /api/provider/register:
 *   post:
 *     summary: Register a new provider
 *     tags: [Provider]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ruc:
 *                 type: string
 *               razonSocial:
 *                 type: string
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
 *               lugarProcedencia:
 *                 type: string
 *     responses:
 *       200:
 *         description: Provider registered successfully
 *       400:
 *         description: Provider already exists
 *       500:
 *         description: Server error
 */
router.post('/register', providerController.registerProvider);

/**
 * @swagger
 * /api/provider:
 *   get:
 *     summary: Obtener todos los proveedores
 *     tags: [Provider]
 *     responses:
 *       200:
 *         description: Retorna todos los proveedores
 *       500:
 *         description: Error del servidor
 */
router.get('/', providerController.getAllProviders);


/**
 * @swagger
 * /api/provider/{id}:
 *   put:
 *     summary: Actualizar un proveedor por ID
 *     tags: [Provider]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proveedor a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ruc:
 *                 type: string
 *               razonSocial:
 *                 type: string
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
 *               lugarProcedencia:
 *                 type: string
 *     responses:
 *       200:
 *         description: Proveedor actualizado exitosamente
 *       404:
 *         description: Proveedor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', providerController.updateProviderById);

/**
 * @swagger
 * /api/provider/{id}:
 *   delete:
 *     summary: Eliminar un proveedor por ID
 *     tags: [Provider]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proveedor a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Proveedor eliminado exitosamente
 *       404:
 *         description: Proveedor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', providerController.deleteProviderById);


/**
 * @swagger
 * /api/provider/{id}:
 *   get:
 *     summary: Obtener un proveedor por ID
 *     tags: [Provider]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proveedor a obtener
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
router.get('/:id', providerController.getProviderById);



module.exports = router;

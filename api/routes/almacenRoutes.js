const express = require('express');
const router = express.Router();
const almacenController = require('../controllers/almacenController');

/**
 * @swagger
 * /api/almacen/get/all:
 *   get:
 *     summary: Obtener todos los Almacenes
 *     tags: [Almacen]
 *     responses:
 *       200:
 *         description: Datos obtenidos satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.get('/get/all', almacenController.obtenerTodosLosAlmacenes);

/**
 * @swagger
 * /api/almacen/get/{id}:
 *   get:
 *     summary: Obtener Almacen por su id
 *     tags: [Almacen]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Almacen a buscar
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
router.get('/get/:id', almacenController.obtenerAlmacenPorId);

/**
 * @swagger
 * /api/almacen/post:
 *   post:
 *     summary: Registrar un Almacen
 *     tags: [Almacen]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               ubicacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Datos creados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.post('/post', almacenController.crearAlmacen);

/**
 * @swagger
 * /api/almacen/put/{id}:
 *   put:
 *     summary: Actualizar un Almacen
 *     tags: [Almacen]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Almacen a actualizar
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
 *               ubicacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Datos actualizados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.put('/put/:id', almacenController.actualizarAlmacen);

/**
 * @swagger
 * /api/almacen/delete/{id}:
 *   delete:
 *     summary: Eliminar un Almacen
 *     tags: [Almacen]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Almacen a eliminar
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
router.delete('/delete/:id', almacenController.eliminarAlmacen);

module.exports = router;

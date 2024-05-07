const express = require('express');
const router = express.Router();
const mermaController = require('../controllers/mermaController');

/**
 * @swagger
 * /api/merma/get/all:
 *   get:
 *     summary: Obtener todas las Mermas
 *     tags: [Merma]
 *     responses:
 *       200:
 *         description: Datos obtenidos satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.get('/get/all', mermaController.obtenerTodosLasMermas);

/**
 * @swagger
 * /api/merma/get/{id}:
 *   get:
 *     summary: Obtener Merma por su id
 *     tags: [Merma]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la merma a buscar
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
router.get('/get/:id', mermaController.obtenerMermaPorId);

/**
 * @swagger
 * /api/merma/post:
 *   post:
 *     summary: Registrar una merma
 *     tags: [Merma]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               cantidad:
 *                 type: number
 *               fecha_conteo:
 *                 type: date
 *               responsable_encargado:
 *                 type: string
 *               motivo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Datos creados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.post('/post', mermaController.crearMerma);

/**
 * @swagger
 * /api/merma/put:
 *   put:
 *     summary: Actualizar una merma
 *     tags: [Merma]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la merma a actualizar
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
 *               cantidad:
 *                 type: number
 *               fecha_conteo:
 *                 type: date
 *               responsable_encargado:
 *                 type: string
 *               motivo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Datos actualizados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.put('/put/:id', mermaController.actualizarMerma);

/**
 * @swagger
 * /api/merma/delete:
 *   delete:
 *     summary: Eliminar una merma
 *     tags: [Merma]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la merma a eliminar
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
router.delete('/delete/:id', mermaController.eliminarMerma);

module.exports = router;

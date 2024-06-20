const express = require('express');
const router = express.Router();
const planProduccionController = require('../controllers/planProduccionController');

/**
 * @swagger
 * /api/plan-produccion/get/all:
 *   get:
 *     summary: Obtener todas los planes de produccion
 *     tags: [PlanProduccion]
 *     responses:
 *       200:
 *         description: Datos obtenidos satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.get('/get/all', planProduccionController.getAllPlanProduccion);

/**
 * @swagger
 * /api/plan-produccion/get/{id}:
 *   get:
 *     summary: Obtener plan de produccion por su id
 *     tags: [PlanProduccion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del plan de produccion
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
router.get('/get/:id', planProduccionController.getByIDPlanProduccion);

/**
 * @swagger
 * /api/plan-produccion/post:
 *   post:
 *     summary: Registrar un plan de produccion
 *     tags: [PlanProduccion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ordenTrabajo:
 *                 type: string
 *               dias:
 *                 type: array
 *                 items:
 *                   type: number
 *               color:
 *                 type: string
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *               fechaFin:
 *                 type: string
 *                 format: date
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Plan de produccion registrado 
 *       400:
 *         description: Plan de produccion ya existe
 *       500:
 *         description: Server error
 */
router.post('/post', planProduccionController.postPlanProduccion);

/**
 * @swagger
 * /api/plan-produccion/{id}:
 *   put:
 *     summary: Actualizar un plan de produccion por ID
 *     tags: [PlanProduccion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del plan de produccion a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ordenTrabajo:
 *                 type: string
 *               dias:
 *                 type: array
 *                 items:
 *                   type: number
 *               color:
 *                 type: string
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *               fechaFin:
 *                 type: string
 *                 format: date
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Plan de produccion actualizada exitosamente
 *       404:
 *         description: Plan de produccion no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', planProduccionController.updatePlanProduccionByID);


/**
 * @swagger
 * /api/plan-produccion/delete/{id}:
 *   delete:
 *     summary: Eliminar un Plan
 *     tags: [PlanProduccion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Plan a eliminar
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
router.delete('/delete/:id', planProduccionController.eliminarPlan);

module.exports = router;

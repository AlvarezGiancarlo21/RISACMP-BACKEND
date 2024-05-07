const express = require('express');
const router = express.Router();
const Merma = require('../models/MermaModel');

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
router.get('/get/all', async (req, res) => {
    try {
        const merma = await Merma.find({});
        res.status(200).json(merma);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

/**
 * @swagger
 * /api/merma/get/{id}:
 *   get:
 *     summary: Obtener Merma por su id
 *     tags: [Merma]
 *     responses:
 *       200:
 *         description: Datos obtenidos satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.get('/get/:id', async (req, res) => {
    try {
        const {id}=req.params;
        const merma = await Merma.findById(id);
        res.status(200).json(merma);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

/**
 * @swagger
 * /api/merma/post:
 *   post:
 *     summary: Registrar una merma
 *     tags: [Merma]
 *     responses:
 *       200:
 *         description: Datos creados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.post('/post', async (req, res) => {
    try {
        const merma = await Merma.create(req.body);
        res.status(200).json(merma);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

/**
 * @swagger
 * /api/merma/put:
 *   put:
 *     summary: Actualizar una merma
 *     tags: [Merma]
 *     responses:
 *       200:
 *         description: Datos actualizados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.put('/put/:id', async (req, res) => {
    try {
        const {id}=req.params;
        const merma = await Merma.findByIdAndUpdate(id, req.body);
        if(!merma){
            return res.status(404).json({message: "Merma no encontrada"});
        }
        const mermaActualizada = await Merma.findById(id);
        res.status(200).json(mermaActualizada);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

/**
 * @swagger
 * /api/merma/delete:
 *   delete:
 *     summary: Eliminar una merma
 *     tags: [Merma]
 *     responses:
 *       200:
 *         description: Datos eliminados satisfactoriamente
 *       400:
 *         description: Error
 *       500:
 *         description: Server error
 */
router.delete('/delete/:id', async (req, res) => {
    try {
        const {id}=req.params;
        const merma = await Merma.findByIdAndDelete(id);
        if(!merma){
            return res.status(404).json({message: "Merma no encontrada"});
        }
        res.status(200).json({message: "Merma eliminada exitosamente"});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

module.exports = router;

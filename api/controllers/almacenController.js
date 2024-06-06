const AlmacenModel = require('../models/Almacen');

const obtenerTodosLosAlmacenes = async (req, res) => {
    try {
        const almacenes = await AlmacenModel.find({});
        res.status(200).json(almacenes);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const obtenerAlmacenPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const almacen = await AlmacenModel.findById(id);
        if (!almacen) {
            return res.status(404).json({ message: "Almacen no encontrado" });
        }
        res.status(200).json(almacen);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const crearAlmacen = async (req, res) => {
    try {
        const almacen = await AlmacenModel.create(req.body);
        res.status(200).json(almacen);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const actualizarAlmacen = async (req, res) => {
    try {
        const { id } = req.params;
        const almacen = await AlmacenModel.findByIdAndUpdate(id, req.body);
        if (!almacen) {
            return res.status(404).json({ message: "Almacen no encontrado" });
        }
        const almacenActualizado = await AlmacenModel.findById(id);
        res.status(200).json(almacenActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const eliminarAlmacen = async (req, res) => {
    try {
        const { id } = req.params;
        const almacen = await AlmacenModel.findByIdAndDelete(id);
        if (!almacen) {
            return res.status(404).json({ message: "Almacen no encontrado" });
        }
        res.status(200).json({ message: "Almacen eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { obtenerTodosLosAlmacenes, obtenerAlmacenPorId, crearAlmacen, actualizarAlmacen, eliminarAlmacen }
const OrigenModel = require('../models/Origen');

const obtenerTodosLosOrigenes = async (req, res) => {
    try {
        const origenes = await OrigenModel.find({});
        res.status(200).json(origenes);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const obtenerOrigenPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const origen = await OrigenModel.findById(id);
        if (!origen) {
            return res.status(404).json({ message: "Origen no encontrado" });
        }
        res.status(200).json(origen);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const crearOrigen = async (req, res) => {
    try {
        if (req.body.tipo == 'ORDEN DE TRABAJO') {
            const orden_trabajo = await OrigenModel.findById(req.body.codigo_origen_id);
            if (!orden_trabajo) {
                return res.status(404).json({ message: "Origen no encontrado" });
            }
        }
        // Agregar validación en caso el tipo no sea una orden de trabajo
        const origen = await OrigenModel.create(req.body);
        res.status(200).json(origen);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const actualizarOrigen = async (req, res) => {
    try {
        if (req.body.tipo == 'ORDEN DE TRABAJO') {
            const orden_trabajo = await OrigenModel.findById(req.body.codigo_origen_id);
            if (!orden_trabajo) {
                return res.status(404).json({ message: "Origen no encontrado" });
            }
        }
        const { id } = req.params;
        const origen = await OrigenModel.findByIdAndUpdate(id, req.body);
        if (!origen) {
            return res.status(404).json({ message: "Origen no encontrado" });
        }
        const origenActualizado = await OrigenModel.findById(id);
        res.status(200).json(origenActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const eliminarOrigen = async (req, res) => {
    try {
        const { id } = req.params;
        const origen = await OrigenModel.findByIdAndDelete(id);
        if (!origen) {
            return res.status(404).json({ message: "Origen no encontrado" });
        }
        res.status(200).json({ message: "Origen eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { obtenerTodosLosOrigenes, obtenerOrigenPorId, crearOrigen, actualizarOrigen, eliminarOrigen }
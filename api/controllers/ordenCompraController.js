const OrdenCompra = require('../models/OrdenCompra');

const obtenerTodosLasOrdenesDeCompra = async (req, res) => {
    try {
        const orden_compra = await OrdenCompra.find({});
        res.status(200).json(orden_compra);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const obtenerOrdenCompraPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const orden_compra = await OrdenCompra.findById(id);
        res.status(200).json(orden_compra);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const crearOrdenCompra = async (req, res) => {
    try {
        const orden_compra = await OrdenCompra.create(req.body);
        res.status(200).json(ord);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

/*
const actualizarMerma = async (req, res) => {
    try {
        const { id } = req.params;
        const merma = await Merma.findByIdAndUpdate(id, req.body);
        if (!merma) {
            return res.status(404).json({ message: "Merma no encontrada" });
        }
        const mermaActualizada = await Merma.findById(id);
        res.status(200).json(mermaActualizada);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const eliminarMerma = async (req, res) => {
    try {
        const { id } = req.params;
        const merma = await Merma.findByIdAndDelete(id);
        if (!merma) {
            return res.status(404).json({ message: "Merma no encontrada" });
        }
        res.status(200).json({ message: "Merma eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}*/

module.exports = {obtenerTodosLasOrdenesDeCompra, obtenerOrdenCompraPorId, crearOrdenCompra}
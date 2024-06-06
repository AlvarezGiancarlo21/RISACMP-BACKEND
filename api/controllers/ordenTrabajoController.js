const OrdenTrabajoModel = require('../models/OrdenTrabajo');
const ProductoModel = require('../models/Producto');

const obtenerTodasLasOrdenesTrabajos = async (req, res) => {
    try {
        const ordenesTrabajos = await OrdenTrabajoModel.find({});
        res.status(200).json(ordenesTrabajos);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const obtenerOrdenTrabajoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const ordenTrabajo = await OrdenTrabajoModel.findById(id);
        if (!ordenTrabajo) {
            return res.status(404).json({ message: "Orden de Trabajo no encontrado" });
        }
        res.status(200).json(ordenTrabajo);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const crearOrdenTrabajo = async (req, res) => {
    try {
        const producto = await ProductoModel.findById(req.body.producto_id);
        if (!producto) {
            return res.status(404).json({ message: "El producto no existe" });
        }
        // Agregar validación de pedido cuando se programe el cus de pedido
        const ordenTrabajo = await OrdenTrabajoModel.create(req.body);
        res.status(200).json(ordenTrabajo);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const actualizarOrdenTrabajo = async (req, res) => {
    try {
        const { id } = req.params;
        const ordenTrabajo = await OrdenTrabajoModel.findByIdAndUpdate(id, req.body);
        if (!ordenTrabajo) {
            return res.status(404).json({ message: "Orden de Trabajo no encontrado" });
        }
        const producto = await ProductoModel.findById(req.body.producto_id);
        if (!producto) {
            return res.status(404).json({ message: "El producto no existe" });
        }
        const ordenTrabajoActualizada = await OrdenTrabajoModel.findById(id);
        res.status(200).json(ordenTrabajoActualizada);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const eliminarOrdenTrabajo = async (req, res) => {
    try {
        const { id } = req.params;
        const ordenTrabajo = await OrdenTrabajoModel.findByIdAndDelete(id);
        if (!ordenTrabajo) {
            return res.status(404).json({ message: "Orden de Trabajo no encontrada" });
        }
        res.status(200).json({ message: "Orden de Trabajo eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { obtenerTodasLasOrdenesTrabajos, obtenerOrdenTrabajoPorId, crearOrdenTrabajo, actualizarOrdenTrabajo, eliminarOrdenTrabajo }
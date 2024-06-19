const OrdenTrabajoModel = require('../models/OrdenTrabajo');
const PedidoModel = require('../models/Pedido');
const RecetaModel = require('../models/Receta');

const obtenerTodasLasOrdenesTrabajos = async (req, res) => {
    try {
        const ordenesTrabajos = await OrdenTrabajoModel.find({});
        res.status(200).json(ordenesTrabajos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const obtenerOrdenTrabajoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const ordenTrabajo = await OrdenTrabajoModel.findById(id);
        if (!ordenTrabajo) {
            return res.status(404).json({ message: "Orden de Trabajo no encontrada" });
        }
        res.status(200).json(ordenTrabajo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const crearOrdenTrabajo = async (req, res) => {
    try {
        const pedido = await PedidoModel.findById(req.body.pedido_id);
        if (!pedido) {
            return res.status(404).json({ message: "El pedido no existe" });
        }

        const receta = await RecetaModel.findById(req.body.producto_id);
        if (!receta) {
            return res.status(404).json({ message: "La receta no existe" });
        }

        const nuevaOrdenTrabajo = {
            pedido,
            receta,
            cantidad_a_realizar: pedido.cantidad.kilos,
            cantidad_realizada: req.body.cantidad_realizada,
            unidad_medida_id: req.body.unidad_medida_id,
            estado: req.body.estado,
        };

        const ordenTrabajo = await OrdenTrabajoModel.create(nuevaOrdenTrabajo);
        res.status(200).json(ordenTrabajo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const actualizarOrdenTrabajo = async (req, res) => {
    try {
        const { id } = req.params;
        const ordenTrabajo = await OrdenTrabajoModel.findById(id);
        if (!ordenTrabajo) {
            return res.status(404).json({ message: "Orden de Trabajo no encontrada" });
        }

        const pedido = await PedidoModel.findById(req.body.pedido_id);
        if (!pedido) {
            return res.status(404).json({ message: "El pedido no existe" });
        }

        const receta = await RecetaModel.findById(req.body.producto_id);
        if (!receta) {
            return res.status(404).json({ message: "La receta no existe" });
        }

        ordenTrabajo.pedido = pedido;
        ordenTrabajo.receta = receta;
        ordenTrabajo.cantidad_a_realizar = req.body.cantidad_a_realizar;
        ordenTrabajo.cantidad_realizada = req.body.cantidad_realizada;
        ordenTrabajo.unidad_medida_id = req.body.unidad_medida_id;
        ordenTrabajo.estado = req.body.estado;

        await ordenTrabajo.save();
        res.status(200).json(ordenTrabajo);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        res.status(500).json({ message: error.message });
    }
}

module.exports = { obtenerTodasLasOrdenesTrabajos, obtenerOrdenTrabajoPorId, crearOrdenTrabajo, actualizarOrdenTrabajo, eliminarOrdenTrabajo };

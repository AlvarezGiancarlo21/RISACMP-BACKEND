const OrdenTrabajoModel = require('../models/OrdenTrabajo');
const RequerimientosModel = require('../models/Requerimientos');

const obtenerTodosLosRequerimientos = async (req, res) => {
    try {
        const requerimientos = await RequerimientosModel.find({});
        res.status(200).json(requerimientos);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const obtenerRequerimientoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const requerimiento = await RequerimientosModel.findById(id);
        if (!requerimiento) {
            return res.status(404).json({ message: "Requerimiento no encontrado" });
        }
        res.status(200).json(requerimiento);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const crearRequerimiento = async (req, res) => {
    /*  req.body = {
            orden_trabajo_id: asdkjnads,
            productos = [
                {
                    producto_id: asd165haskdj,
                    cantidad: 15,
                    unidad_medida_id: sahukdjas165,
                },
                {
                    producto_id: asd165asdhaskdj,
                    cantidad: 18,
                    unidad_medida_id: sahukasddjas165,
                },
            ]
        }
    */ 
    try {
        const ordenDeTrabajoValidacion = await OrdenTrabajoModel.findById(req.body.orden_trabajo_id)
        if (!ordenDeTrabajoValidacion) {
            res.status(404).json({message: "La Orden de Trabajo no existe"})
        }
        let datos = {
            orden_trabajo_id: req.body.orden_trabajo_id,
            estado: "EN ESPERA",
            productos: req.body.productos,
        }
        let requerimientos = await RequerimientosModel.create(datos);
        /*requerimientos = requerimientos._id;
        let requerimientosDetalles;
        for (let producto of productos) {
            datos = {
                requerimiento_id: requerimientos,
                producto_id: producto.producto_id,
                cantidad: producto.cantidad,
                unidad_medida_id: producto.unidad_medida_id,
            }
            requerimientosDetalles = await RequerimientosDetallesModel.create(datos);
        }*/
        
        res.status(200).json(requerimientos);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const actualizarEstadoRequerimiento = async (req, res) => {
    try {
        const { id } = req.params;
        let requerimiento = await RequerimientosModel.findById(id);
        if (!requerimiento) {
            return res.status(404).json({ message: "Requerimiento no encontrado" });
        }
        if (requerimiento.estado == "EN ESPERA") {
            datos = {
                estado: "EN PROCESO",
            }
        }
        else if (requerimiento.estado == "EN PROCESO") {
            datos = {
                estado: "FINALIZADO",
            }
        }
        requerimiento = await RequerimientosModel.findByIdAndUpdate(id, datos);
        res.status(200).json({ message: "El estado del requerimiento fue actualizado exitosamente"});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const eliminarRequerimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const requerimiento = await RequerimientosModel.findByIdAndDelete(id);
        if (!requerimiento) {
            return res.status(404).json({ message: "Requerimiento no encontrado" });
        }
        res.status(200).json({ message: "Requerimiento eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { obtenerTodosLosRequerimientos, obtenerRequerimientoPorId, crearRequerimiento, actualizarEstadoRequerimiento, eliminarRequerimiento }
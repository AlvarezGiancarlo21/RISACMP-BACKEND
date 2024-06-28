const UnidadMedida = require('../models/UnidadMedidaModel');

const obtenerTodosLasUnidadesDeMedida = async (req, res) => {
    try {
        const datos = await UnidadMedida.find({});
        res.status(200).json(datos);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const obtenerUnidadMedidaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await UnidadMedida.findById(id);
        res.status(200).json(dato);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const crearUnidadMedida = async (req, res) => {
    try {
        let validacion = await UnidadMedida.findOne({nombre:req.body.nombre})
        if (validacion) {
            return res.status(400).json({ message: "Nombre de Unidad de Medida ya existente" });
        }
        validacion = await UnidadMedida.findOne({simbolo:req.body.simbolo})
        if (validacion) {
            return res.status(400).json({message: "Símbolo de Unidad de Medida ya existente"})
        }
        const dato = await UnidadMedida.create(req.body);
        res.status(200).json(dato);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const actualizarUnidadMedida = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await UnidadMedida.findByIdAndUpdate(id, req.body);
        if (!dato) {
            return res.status(404).json({ message: "Unidad de Medida no encontrada" });
        }
        const unidadMedidaActualizada = await UnidadMedida.findById(id);
        res.status(200).json(unidadMedidaActualizada);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const eliminarUnidadMedida = async (req, res) => {
    try {
        const { id } = req.params;
        const dato = await UnidadMedida.findByIdAndDelete(id);
        if (!dato) {
            return res.status(404).json({ message: "Unidad de Medida no encontrada" });
        }
        res.status(200).json({ message: "Unidad de Medida eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { obtenerTodosLasUnidadesDeMedida, obtenerUnidadMedidaPorId, crearUnidadMedida, actualizarUnidadMedida, eliminarUnidadMedida }
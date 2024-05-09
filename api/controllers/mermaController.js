const Merma = require('../models/MermaModel');

const obtenerTodosLasMermas = async (req, res) => {
    try {
        const merma = await Merma.find({});
        res.status(200).json(merma);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const obtenerMermaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const merma = await Merma.findById(id);
        res.status(200).json(merma);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const crearMerma = async (req, res) => {
    try {
        const merma = await Merma.create(req.body);
        res.status(200).json(merma);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

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
}

module.exports = { obtenerTodosLasMermas, obtenerMermaPorId, crearMerma, actualizarMerma, eliminarMerma }
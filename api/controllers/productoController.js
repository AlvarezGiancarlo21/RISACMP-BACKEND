const ProductoModel = require('../models/Producto');

const obtenerTodosLosProductos = async (req, res) => {
    try {
        const productos = await ProductoModel.find({});
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await ProductoModel.findById(id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const crearProducto = async (req, res) => {
    try {
        const producto = await ProductoModel.create(req.body);
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await ProductoModel.findByIdAndUpdate(id, req.body);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        const productoActualizado = await ProductoModel.findById(id);
        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await ProductoModel.findByIdAndDelete(id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { obtenerTodosLosProductos, obtenerProductoPorId, crearProducto, actualizarProducto, eliminarProducto }
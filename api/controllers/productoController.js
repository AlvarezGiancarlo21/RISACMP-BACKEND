const ProductoModel = require('../models/Producto');
const UnidadMedidaModel = require('../models/UnidadMedidaModel');

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
        let validacion = await ProductoModel.findOne({nombre:req.body.nombre})
        console.log(req.body);
        if (validacion) {
            return res.status(400).json({ message: "Producto ya existente" });
        }
        if (req.body.tipo!="Producto Terminado" && req.body.tipo!="Merma" && req.body.tipo!="Ingrediente") {
            return res.status(400).json({ message: "Los tipos de producto válidos son: 'Producto Terminado', 'Ingrediente' y 'Merma'." });
        }
        validacion = await UnidadMedidaModel.findById(req.body.unidad_medida_id);
        if (!validacion) {
            return res.status(400).json({ message: "Unidad de Medida no encontrada" });
        }
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
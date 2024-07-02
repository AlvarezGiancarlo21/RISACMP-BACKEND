const ProductoModel = require('../models/Producto');
const UnidadMedidaModel = require('../models/UnidadMedidaModel');

const obtenerTodosLosProductos = async (req, res) => {
    try {
        const productos = await ProductoModel.find({});

        let datos = [{}], i=0;
        for (let producto of productos) {
            const unidad_medida = await UnidadMedidaModel.findById(producto.unidad_medida_id);
            datos[i] = {
                id: producto.id,
                nombre: producto.nombre,
                tipo: producto.tipo,
                cantidad_total: producto.cantidad_total,
                unidad_medida: {
                    id: unidad_medida.id,
                    nombre: unidad_medida.nombre,
                    simbolo: unidad_medida.simbolo,
                },
                hasReceta: producto.hasReceta,
            }
            i++;
        }
        res.status(200).json(datos);
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
        datos = {
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            cantidad_total: 0,
            unidad_medida_id: req.body.unidad_medida_id,
            hasReceta: false,
        }
        const producto = await ProductoModel.create(datos);
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
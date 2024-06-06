const AlmacenProductoModel = require('../models/AlmacenProducto');
const AlmacenModel = require('../models/Almacen');
const ProductoModel = require('../models/Producto');
const OrigenModel = require('../models/Origen');
const OrdenTrabajoModel = require('../models/OrdenTrabajo');

const obtenerTodosLosAlmacenesProductos = async (req, res) => {
    try {
        const almacen_productos = await AlmacenProductoModel.find({});
        res.status(200).json(almacen_productos);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const obtenerAlmacenProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const almacen_producto = await AlmacenProductoModel.findById(id);
        if (!almacen_producto) {
            return res.status(404).json({ message: "Producto en Almacen no encontrado" });
        }
        res.status(200).json(almacen_producto);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const crearAlmacenProducto = async (req, res) => {
    try {
        const almacen = await AlmacenModel.findById(req.body.almacen_id);
        if (!almacen) {
            return res.status(404).json({ message: "El Almacen no existe" });
        }
        const producto = await ProductoModel.findById(req.body.producto_id);
        if (!producto) {
            return res.status(404).json({ message: "El Producto no existe" });
        }
        if (req.body.tipo_origen == 'ORDEN DE TRABAJO') {
            const orden_trabajo = await OrdenTrabajoModel.findById(req.body.codigo_origen_id);
            if (!orden_trabajo) {
                return res.status(404).json({ message: "La Orden de Trabajo no existe" });
            }
            let datos = {
                tipo: req.body.tipo_origen,
                codigo_origen_id: req.body.codigo_origen_id,
            }
            let origen = await OrigenModel.create(datos);
            origen = origen._id;

            datos = {
                almacen_id: req.body.almacen_id,
                producto_id: req.body.producto_id,
                cantidad: req.body.cantidad,
                unidad_medida_id: req.body.unidad_medida_id,
                estado: req.body.estado,
                origen_id: origen
            }
            const almacen_producto = await AlmacenProductoModel.create(datos);
            res.status(200).json(almacen_producto);
        }
        // Agregar validación en caso el tipo no sea una orden de trabajo
        else {
            return res.status(404).json({ message: "Tipo de Origen Inválido" });
        }


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const actualizarAlmacenProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const almacen_producto = await AlmacenProductoModel.findByIdAndUpdate(id, req.body);
        if (!almacen_producto) {
            return res.status(404).json({ message: "Producto en Almacen no encontrado" });
        }
        const almacen = await AlmacenModel.findById(req.body.almacen_id);
        if (!almacen) {
            return res.status(404).json({ message: "El Almacen no existe" });
        }
        const producto = await ProductoModel.findById(req.body.producto_id);
        if (!producto) {
            return res.status(404).json({ message: "El Producto no existe" });
        }
        const almacen_productoActualizado = await AlmacenProductoModel.findById(id);
        res.status(200).json(almacen_productoActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const eliminarAlmacenProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const almacen_producto = await AlmacenProductoModel.findByIdAndDelete(id);
        if (!almacen_producto) {
            return res.status(404).json({ message: "Producto en Almacen no encontrado" });
        }
        res.status(200).json({ message: "Producto en Almacen eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { obtenerTodosLosAlmacenesProductos, obtenerAlmacenProductoPorId, crearAlmacenProducto, actualizarAlmacenProducto, eliminarAlmacenProducto }
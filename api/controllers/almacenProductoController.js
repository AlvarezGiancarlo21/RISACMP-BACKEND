const AlmacenProductoModel = require('../models/AlmacenProducto');
const AlmacenModel = require('../models/Almacen');
const ProductoModel = require('../models/Producto');
const ProductoDetalleModel = require('../models/ProductoDetalle');

const obtenerTodosLosAlmacenesProductos = async (req, res) => {
    try {
        const almacen_productos = await AlmacenProductoModel.find({});
        let datos=[];
        for (almacen_producto of almacen_productos) {
            const producto = await ProductoModel.findById(almacen_producto.producto_id)
            datos.push({
                id: almacen_producto.id,
                numero_serie: almacen_producto.numero_serie,
                lote: almacen_producto.lote,
                almacen_id: almacen_producto.almacen_id,
                producto: {
                    id: producto.id,
                    nombre: producto.nombre,
                },
                estado: almacen_producto.estado,
                origen_id: almacen_producto.origen_id,
                createdAt: almacen_producto.createdAt,
                updatedAt: almacen_producto.updatedAt,
            })
        }
        res.status(200).json(datos);
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
        let datos;
        const almacen = await AlmacenModel.findById(req.body.almacen_id);
        if (!almacen) {
            return res.status(404).json({ message: "El Almacen no existe" });
        }
        const producto = await ProductoModel.findById(req.body.producto_id);
        if (!producto) {
            return res.status(404).json({ message: "El Producto no existe" });
        }
        let producto_detalle = await ProductoDetalleModel.find({producto_id: req.body.producto_id});
        if (producto_detalle.length == 0) {
            const post_producto_detalle = await ProductoDetalleModel.create({
                producto_id: req.body.producto_id,
                cantidad_total: 0,
            })
            producto_detalle = await ProductoDetalleModel.find({producto_id: req.body.producto_id});
        }
        if (producto_detalle[0].cantidad_total < 0) {
            datos= {
                cantidad_total: 0,
            }
            producto_detalle = await ProductoDetalleModel.findOneAndUpdate({producto_id:req.body.producto_id}, datos, { new: true, upsert: false });
        }
        datos= {
            cantidad_total: Number(producto_detalle[0].cantidad_total) + 1,
        }
        let resultado = await ProductoDetalleModel.findOneAndUpdate({producto_id:req.body.producto_id}, datos);
        datos = {
            numero_serie: req.body.numero_serie,
            lote: req.body.lote,
            almacen_id: req.body.almacen_id,
            producto_id: req.body.producto_id,
            estado: "En Almacén",
            tipo_origen: "Entrada de Requerimiento",
            origen_id: "No tiene",
        }
        resultado = await AlmacenProductoModel.create(datos);
        res.status(200).json(resultado);
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
        let almacen_producto = await AlmacenProductoModel.findById(id);
        if (!almacen_producto) {
            return res.status(404).json({ message: "Producto en Almacen no encontrado" });
        }
        let producto_detalle = await ProductoDetalleModel.find({producto_id: almacen_producto.producto_id});
        
        if (producto_detalle.length > 0) {
            datos= {
                cantidad_total: Number(producto_detalle[0].cantidad_total) - 1,
            }
            let resultado = await ProductoDetalleModel.findOneAndUpdate({producto_id:almacen_producto.producto_id}, datos);
        }
        almacen_producto = await AlmacenProductoModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Producto en Almacen eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { obtenerTodosLosAlmacenesProductos, obtenerAlmacenProductoPorId, crearAlmacenProducto, actualizarAlmacenProducto, eliminarAlmacenProducto }
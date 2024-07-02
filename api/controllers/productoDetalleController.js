const ProductoDetalleModel = require('../models/ProductoDetalle');
const ProductoModel = require('../models/Producto');

const obtenerTodosLosProductosDetalles = async (req, res) => {
    try {
        const productos_detalles = await ProductoDetalleModel.find({});
        let datos=[];
        for (producto_detalle of productos_detalles) {
            const producto = await ProductoModel.findById(producto_detalle.producto_id)
            datos.push({
                id: producto_detalle.id,
                producto_id: producto_detalle.producto_id,
                nombre: producto.nombre,
                cantidad_total: producto_detalle.cantidad_total,
            })
        }
        res.status(200).json(datos);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { obtenerTodosLosProductosDetalles };
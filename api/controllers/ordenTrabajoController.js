const OrdenTrabajoModel = require('../models/OrdenTrabajo');
const PedidoModel = require('../models/Pedido');
const RecetaModel = require('../models/Receta');
const ProductoModel = require('../models/Producto');
const AlmacenProductoModel = require('../models/AlmacenProducto');
const ProductoDetalleModel = require('../models/ProductoDetalle');

const obtenerTodasLasOrdenesTrabajos = async (req, res) => {
    try {
        const ordenesTrabajos = await OrdenTrabajoModel.find({});
        let datos = [{}], i=0;
        for (let ordenTrabajo of ordenesTrabajos) {
            const producto = await ProductoModel.findById(ordenTrabajo.producto_id);
            datos[i] = {
                id: ordenTrabajo.id,
                pedido_id: ordenTrabajo.pedido_id,
                producto_id: ordenTrabajo.producto_id,
                nombre_producto: producto.nombre,
                cantidad_a_realizar: ordenTrabajo.cantidad_a_realizar,
                cantidad_realizada: ordenTrabajo.cantidad_realizada,
                estado: ordenTrabajo.estado,
            }
            i++;
        }
        res.status(200).json(datos);
        
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

const crearOrdenTrabajoAPartirDePedido = async (req, res) => {
    try {
        const { pedido_id } = req.params;
        pedido = await PedidoModel.findById(pedido_id);
        if (!pedido) {
            return res.status(404).json({ message: "El pedido no existe" });
        }
        let datos, validacion;
        // Validaciones producto
        for (let producto of pedido.productos) {
            validacion = await ProductoModel.findById(producto.producto_id);
            if (!validacion) {
                return res.status(404).json({ message: `El producto con id ${producto.producto_id} no existe` });
            }
        }
        // Fin validaciones
        
        let ordenesTrabajo;
        for (let pedido_producto of pedido.productos) {
            const producto = await ProductoModel.findById(pedido_producto.producto_id);
            const receta = await RecetaModel.find({nombre: producto.nombre});
            let objeto = [], rendimiento;
            rendimiento = pedido_producto.cantidad / receta[0].rendimiento;
            for (let ingrediente of receta[0].ingredientes) {
                let id_producto = await ProductoModel.find({nombre: ingrediente.nombre});
                objeto.push({
                    id: id_producto[0].id,
                    nombre: ingrediente.nombre,
                    cantidad: ingrediente.cantidad * rendimiento,
                })
            }
            datos = {
                pedido_id: pedido_id,
                producto_id: pedido_producto.producto_id,
                cantidad_a_realizar: {
                    producto: pedido_producto.cantidad,
                    ingredientes: objeto,
                },
                cantidad_realizada: 0,
                estado: "EN ESPERA",
            }
            ordenesTrabajo = await OrdenTrabajoModel.create(datos);
        }
        res.status(200).json(ordenesTrabajo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const actualizarOrdenTrabajo = async (req, res) => { // Actualizar cantidad realizada
    try {
        const { id } = req.params;
        let ordenTrabajo = await OrdenTrabajoModel.findById(id);
        if (!ordenTrabajo) {
            return res.status(404).json({ message: "Orden de Trabajo no encontrada" });
        }
        if (ordenTrabajo.estado == "EN ESPERA") {
            return res.status(400).json({ message: "No se puede actualizar una Orden de Trabajo 'En Espera'." });
        }
        if (ordenTrabajo.estado == "FINALIZADA") {
            return res.status(400).json({ message: "No se puede actualizar una Orden de Trabajo 'Finalizada'." });
        }
        ordenTrabajo.cantidad_realizada += req.body.cantidad_realizada;
        if (ordenTrabajo.cantidad_realizada>ordenTrabajo.cantidad_a_realizar.producto) {
            return res.status(400).json({ message: "No se puede sobrepasar la cantidad designada a producir." });
        }
        if (ordenTrabajo.cantidad_realizada>=ordenTrabajo.cantidad_a_realizar.producto) {
            ordenTrabajo.estado = "FINALIZADA";
            let producto_detalle = await ProductoDetalleModel.find({producto_id: ordenTrabajo.producto_id});
            let data = {
                cantidad_total: Number(producto_detalle[0].cantidad_total) + Number(ordenTrabajo.cantidad_a_realizar.producto),
            }
            producto_detalle = await ProductoDetalleModel.findOneAndUpdate({producto_id: ordenTrabajo.producto_id}, data, { new: true, upsert: false });

        }
        await ordenTrabajo.save();
        res.status(200).json(ordenTrabajo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const actualizarEstadoOrdenTrabajo = async (req, res) => { // Aceptar Orden de Trabajo
    try {
        const { id } = req.params;
        let ordenTrabajo = await OrdenTrabajoModel.findById(id);
        if (!ordenTrabajo) {
            return res.status(404).json({ message: "Orden de Trabajo no encontrada" });
        }
        if (ordenTrabajo.estado == "EN PROCESO") {
            return res.status(400).json({ message: "No se puede actualizar una Orden de Trabajo 'En Proceso'" });
        }
        if (ordenTrabajo.estado == "FINALIZADA") {
            return res.status(400).json({ message: "No se puede actualizar una Orden de Trabajo 'Finalizada'" });
        }

        ordenTrabajo.estado = "EN PROCESO";

        for (let ingrediente of ordenTrabajo.cantidad_a_realizar.ingredientes) {
            let producto_detalle = await ProductoDetalleModel.find({producto_id: ingrediente.id});
            let data = {
                cantidad_total: Number(producto_detalle[0].cantidad_total) - Number(ingrediente.cantidad),
            }
            if (data.cantidad_total < 0) {
                return res.status(400).json({ message: `No hay suficientes ingredientes. Hay ${producto_detalle[0].cantidad_total} ${ingrediente.nombre} y se requieren ${ingrediente.cantidad}` });
            }
        }

        for (let ingrediente of ordenTrabajo.cantidad_a_realizar.ingredientes) {
            let producto_detalle = await ProductoDetalleModel.find({producto_id: ingrediente.id});
            let data = {
                cantidad_total: Number(producto_detalle[0].cantidad_total) - Number(ingrediente.cantidad),
            }
            producto_detalle = await ProductoDetalleModel.findOneAndUpdate({producto_id: ingrediente.id}, data);
        }

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

module.exports = { obtenerTodasLasOrdenesTrabajos, obtenerOrdenTrabajoPorId, actualizarOrdenTrabajo, actualizarEstadoOrdenTrabajo, eliminarOrdenTrabajo, crearOrdenTrabajoAPartirDePedido };

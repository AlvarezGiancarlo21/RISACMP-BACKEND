const OrdenTrabajoModel = require('../models/OrdenTrabajo');
const PedidoModel = require('../models/Pedido');
const RecetaModel = require('../models/Receta');
const ProductoModel = require('../models/Producto');
const AlmacenProductoModel = require('../models/AlmacenProducto');
const UnidadMedidaModel = require('../models/UnidadMedidaModel');
const PlanProduccionModel = require('../models/PlanProduccion');

const obtenerTodasLasOrdenesTrabajos = async (req, res) => {
    try {
        const ordenesTrabajos = await OrdenTrabajoModel.find({});
        let datos = [{}], i=0;
        for (let ordenTrabajo of ordenesTrabajos) {
            const pedido = await PedidoModel.findById(ordenTrabajo.pedido_id);
            const producto = await ProductoModel.findById(ordenTrabajo.producto_id);
            const unidad_medida = await UnidadMedidaModel.findById(producto.unidad_medida_id);
            datos[i] = {
                id: ordenTrabajo.id,
                codigo_Orden: ordenTrabajo.codigo_Orden,
                pedido: {
                    id: ordenTrabajo.pedido_id,
                    codigoPedido: pedido.codigoPedido,
                    nombreCliente: pedido.nombreCliente,
                    estadoPedido: pedido.estadoPedido,
                    observacion: pedido.observacion,
                    fechaPedido: pedido.fechaPedido,
                },
                producto: {
                    id: ordenTrabajo.producto_id,
                    nombre: producto.nombre,
                    tipo: producto.tipo,
                    unidad_medida: {
                        id: producto.unidad_medida_id,
                        nombre:unidad_medida.nombre,
                        simbolo:unidad_medida.simbolo,
                    }
                },
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
        // Validaciones
        const { pedido_id } = req.params;
        pedido = await PedidoModel.findById(pedido_id);
        if (!pedido) {
            return res.status(404).json({ message: "El pedido no existe" });
        }
        let datos, validacion;
        for (let producto of pedido.productos) {
            validacion = await ProductoModel.findById(producto.producto_id);
            if (!validacion) {
                return res.status(404).json({ message: `El producto con id ${producto.producto_id} no existe` });
            }
        }
        let ordenesTrabajo = await OrdenTrabajoModel.findOne({pedido_id: pedido_id})
        if (ordenesTrabajo) {
            return res.status(400).json({ message: "Ya existen ordenes de trabajo con ese pedido" });
        }
        
        datos = {
            estadoPedido: "En proceso",
        }
        pedido = await PedidoModel.findByIdAndUpdate(pedido_id, datos);
        
        for (let pedido_producto of pedido.productos) {
            const producto = await ProductoModel.findById(pedido_producto.producto_id);
            const receta = await RecetaModel.findOne({nombre: producto.nombre});
            let objeto = [], rendimiento;
            rendimiento = pedido_producto.cantidad / receta.rendimiento;
            for (let ingrediente of receta.ingredientes) {
                let id_producto = await ProductoModel.findOne({nombre: ingrediente.nombre});
                objeto.push({
                    id: id_producto.id,
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
                estado: "EN PROCESO",
            }

            for (let ingrediente of datos.cantidad_a_realizar.ingredientes) {
                let producto = await ProductoModel.findById(ingrediente.id);
                let data = {
                    cantidad_total: Number(producto.cantidad_total) - Number(ingrediente.cantidad),
                }
                if (data.cantidad_total < 0) {
                    return res.status(400).json({ message: `No hay suficientes ingredientes. Hay ${producto.cantidad_total} ${ingrediente.nombre} y se requieren ${ingrediente.cantidad}` });
                }
            }

            
        }

        // Fin validaciones

        objeto = [];
        for (let pedido_producto of pedido.productos) {
            const producto = await ProductoModel.findById(pedido_producto.producto_id);
            const receta = await RecetaModel.findOne({ nombre: producto.nombre });
            let objeto = [], rendimiento;
            rendimiento = pedido_producto.cantidad / receta.rendimiento;
            for (let ingrediente of receta.ingredientes) {
                let id_producto = await ProductoModel.findOne({ nombre: ingrediente.nombre });
                objeto.push({
                    id: id_producto.id,
                    nombre: ingrediente.nombre,
                    cantidad: ingrediente.cantidad * rendimiento,
                })
            }
            const lastOrden = await OrdenTrabajoModel.findOne().sort({ codigo_Orden: -1 });
            let nextCodigoOrden = 1;
            if (lastOrden) {
                // Si hay ordenes previas, incrementar el código
                const lastNumero = parseInt(lastOrden.codigo_Orden.split('-')[1]);
                nextCodigoOrden = lastNumero + 1;
            }

            const nuevoCodigoOrden = `ORDEN-${nextCodigoOrden}`;
            datos = {
                codigo_Orden: nuevoCodigoOrden,
                pedido_id: pedido_id,
                producto_id: pedido_producto.producto_id,
                cantidad_a_realizar: {
                    producto: pedido_producto.cantidad,
                    ingredientes: objeto,
                },
                cantidad_realizada: 0,
                estado: "EN PROCESO",
            }
            
            for (let ingrediente of datos.cantidad_a_realizar.ingredientes) {
                let producto = await ProductoModel.findById(ingrediente.id);
                let data = {
                    cantidad_total: Number(producto.cantidad_total) - Number(ingrediente.cantidad),
                }
                producto = await ProductoModel.findByIdAndUpdate(ingrediente.id, data);
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
        ordenTrabajo.cantidad_realizada = Number(ordenTrabajo.cantidad_realizada) + Number(req.body.cantidad_realizada);
        if (ordenTrabajo.cantidad_realizada>ordenTrabajo.cantidad_a_realizar.producto) {
            return res.status(400).json({ message: "No se puede sobrepasar la cantidad designada a producir." });
        }
        if (ordenTrabajo.cantidad_realizada>=ordenTrabajo.cantidad_a_realizar.producto) {
            ordenTrabajo.estado = "FINALIZADA";
            let planes = await PlanProduccionModel.find({ ordenTrabajo: ordenTrabajo.codigo_Orden});
            for (let plan of planes) {
                let planeacionPut = {
                    color: "blue",
                    estado: "FINALIZADA",
                }
                console.log("////////////////////////////////////////////////////////");
                console.log(plan._id);
                let actualizar = await PlanProduccionModel.findByIdAndUpdate(plan._id, planeacionPut, { new: true, upsert: false });
                console.log("////////////////////////////////////////////////////////");
                console.log(actualizar);
            }
            let producto = await ProductoModel.findById(ordenTrabajo.producto_id);
            let data = {
                cantidad_total: Number(producto.cantidad_total) + Number(ordenTrabajo.cantidad_a_realizar.producto),
            }
            producto = await ProductoModel.findByIdAndUpdate(ordenTrabajo.producto_id, data, { new: true, upsert: false });

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
            let producto = await ProductoModel.findById(ingrediente.id);
            let data = {
                cantidad_total: Number(producto.cantidad_total) - Number(ingrediente.cantidad),
            }
            if (data.cantidad_total < 0) {
                return res.status(400).json({ message: `No hay suficientes ingredientes. Hay ${producto.cantidad_total} ${ingrediente.nombre} y se requieren ${ingrediente.cantidad}` });
            }
        }

        for (let ingrediente of ordenTrabajo.cantidad_a_realizar.ingredientes) {
            let producto = await ProductoModel.find(ingrediente.id);
            let data = {
                cantidad_total: Number(producto.cantidad_total) - Number(ingrediente.cantidad),
            }
            producto = await ProductoModel.findByIdAndUpdate(ingrediente.id, data);
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

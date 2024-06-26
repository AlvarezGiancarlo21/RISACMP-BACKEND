const OrdenCompra = require('../models/OrdenCompra');

const fs = require('fs');
const multer = require('multer'); // Importa multer

//Implementacion de AWS para la carga de archivos y documentos
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

// Configura AWS S3
const s3 = new AWS.S3({
    accessKeyId: 'AKIA4MTWJXPAMMTCXCVI',
    secretAccessKey: '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',
});

// Configura multer para cargar archivos en S3
const uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'awsrisacmpproyect',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    })
});

// Configuración de multer para carga de archivos local
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });
// Exportar multer uploadS3 para usarlo en las rutas
exports.uploadS3 = uploadS3;

// Exportar multer upload para usarlo en las rutas
exports.upload = upload;


//Obtener todos
exports.obtenerTodosLasOrdenesDeCompra = async (req, res) => {
    try {
        const orden_compra = await OrdenCompra.find({});
        res.status(200).json(orden_compra);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Obtener por _id
exports.obtenerOrdenCompraPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const orden_compra = await OrdenCompra.findById(id);
        res.status(200).json(orden_compra);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Registrar orden de compra
exports.crearOrdenCompra = async (req, res) => {
    const { nro, nombre, user, fecha_subida, proveedor, productos, estado } = req.body;
    const archivo = req.file ? req.file.path : null; // Obtener la ruta del archivo si se carga
    try {
        let orden = await OrdenCompra.findOne({ nombre });
        if (orden) {
            return res.status(400).json({ msg: 'La orden ya existe' });
        }

        let productosParsed;
        try {
            productosParsed = typeof productos === 'string' ? JSON.parse(productos) : productos;
        } catch (error) {
            return res.status(400).json({ msg: 'El formato de productos no es válido' });
        }

        orden = new OrdenCompra({
            nro,
            nombre,
            archivo,
            user,
            fecha_subida,
            proveedor,
            productos : productosParsed,
            estado
        })
        if (req.file) {
            const fileUrl = req.file.location; // Obtiene la URL del archivo en S3
            orden.archivo = fileUrl;
        }

        await orden.save();
        res.json({ msg: 'Orden registrada correctamente' });

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("Server error:(")
    }
}

//Editar orden de compra
exports.editarOrdenCompraPorId = async (req, res) => {
    const { id } = req.params;
    const { nro, nombre, archivo, user, fecha_subida, proveedor, productos, estado } = req.body;

    try {
        let orden = await OrdenCompra.findById(id);

        if (!orden) return res.status(404).json({ msg: 'Orden de compra no encontrada' });

        orden.nro = nro || orden.nro;
        orden.nombre = nombre || orden.nombre;
        orden.archivo = archivo || orden.archivo;
        orden.user = user || orden.user;
        orden.fecha_subida = fecha_subida || orden.fecha_subida;
        orden.proveedor = proveedor || orden.proveedor;
        orden.productos = productos || orden.productos;
        orden.estado = estado || orden.estado;

        await orden.save();

        res.json({ msg: 'Orden de compra actualizada exitosamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
}

// Exportar multer upload para usarlo en las rutas
exports.upload = upload;
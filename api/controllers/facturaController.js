const Factura = require("../models/Factura");
const OrdenCompra = require('../models/OrdenCompra');
const Producto = require('../models/Producto');
const fs = require('fs');
const multer = require('multer'); 
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
    accessKeyId: 'AKIA4MTWJXPAMMTCXCVI',
    secretAccessKey: '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',
});

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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

exports.uploadS3 = uploadS3;
exports.upload = upload;

exports.registerFacturas = async (req, res) => {
  const { codigoOrdenCompra, rucProveedor, razonSocial, user, codigoFactura, productos, fechaEmision, fechaIngreso, montoAntesImpuestos, estado } = req.body;
  const archivo = req.file ? req.file.path : null;

  try {
    let factura = await Factura.findOne({ codigoFactura });

    if (factura) {
      return res.status(400).json({ msg: "Factura already exists" });
    }

    let productosParsed;
    try {
      productosParsed = typeof productos === 'string' ? JSON.parse(productos) : productos;
    } catch (error) {
      return res.status(400).json({ msg: 'El formato de productos no es válido' });
    }

    factura = new Factura({
      codigoOrdenCompra,
      rucProveedor,
      razonSocial,
      archivo,
      user,
      codigoFactura,
      productos: productosParsed,
      fechaEmision,
      fechaIngreso,
      montoAntesImpuestos,
      estado
    });

    if (req.file) {
      const fileUrl = req.file.location;
      factura.archivo = fileUrl;
    }

    await factura.save();

    await OrdenCompra.findOneAndUpdate({ nro: codigoOrdenCompra }, { estado: 'Facturado' });

    for (let producto of productosParsed) {
      await Producto.findOneAndUpdate(
        { nombre: producto.nombre },
        { $inc: { cantidad_total: producto.cantidad } },
        { new: true }
      );
    }

    res.json({ msg: "factura registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllfacturas = async (req, res) => {
  try {
    const facturas = await Factura.find({});
    res.status(200).json(facturas);
  } catch (err) {
    console.error("Error al obtener todas las facturas:", err.message);
    res.status(500).json({ error: "Error al obtener todas las facturas" });
  }
};

exports.getFacturaById = async (req, res) => {
  const { id } = req.params;

  try {
    const factura = await Factura.findById(id);

    if (!factura) {
      return res.status(404).json({ msg: "Orden de compra no encontrado" });
    }

    res.json(factura);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};

const NotaCredito = require('../models/NotaCredito');

// Crear una nueva nota de crédito
exports.createNotaCredito = async (req, res) => {
  const { codigo, codigoFactura, rucProveedor, razonSocial, tipo, descipcion, productos, fechaEmision, fechaIngreso, monto, monto_nc, monto_diferencia } = req.body;

  try {
    // let productosParsed;
    // if (typeof productos === 'string') {
    //   try {
    //     productosParsed = JSON.parse(productos);
    //   } catch (error) {
    //     return res.status(400).json({ msg: 'El formato de productos no es válido' });
    //   }
    // } else {
    //   productosParsed = productos;
    // }

    const nuevaNotaCredito = new NotaCredito({
      codigo,
      codigoFactura,
      rucProveedor,
      razonSocial,
      tipo,
      descipcion,
      productos,
      fechaEmision,
      fechaIngreso,
      monto,
      monto_nc,
      monto_diferencia
    });

    await nuevaNotaCredito.save();
    res.status(201).json({ msg: "Nota de crédito creada con éxito", notaCredito: nuevaNotaCredito });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};

// Obtener todas las notas de crédito
exports.getNotasCredito = async (req, res) => {
  try {
    const notasCredito = await NotaCredito.find();
    res.json(notasCredito);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};

// Obtener una nota de crédito por ID
exports.getNotaCreditoById = async (req, res) => {
  const { id } = req.params;

  try {
    const notaCredito = await NotaCredito.findById(id);

    if (!notaCredito) {
      return res.status(404).json({ msg: 'Nota de crédito no encontrada' });
    }

    res.json(notaCredito);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};

// Actualizar una nota de crédito
exports.updateNotaCredito = async (req, res) => {
  const { id } = req.params;
  const { codigo, codigoFactura, rucProveedor, razonSocial, tipo, descipcion, productos, fechaEmision, fechaIngreso, monto, monto_nc, monto_diferencia } = req.body;

  try {
    let productosParsed;
    if (typeof productos === 'string') {
      try {
        productosParsed = JSON.parse(productos);
      } catch (error) {
        return res.status(400).json({ msg: 'El formato de productos no es válido' });
      }
    } else {
      productosParsed = productos;
    }

    let notaCredito = await NotaCredito.findById(id);

    if (!notaCredito) {
      return res.status(404).json({ msg: 'Nota de crédito no encontrada' });
    }

    notaCredito.codigo = codigo;
    notaCredito.codigoFactura = codigoFactura;
    notaCredito.rucProveedor = rucProveedor;
    notaCredito.razonSocial = razonSocial;
    notaCredito.tipo = tipo;
    notaCredito.descipcion = descipcion;
    notaCredito.productos = productosParsed;
    notaCredito.fechaEmision = fechaEmision;
    notaCredito.fechaIngreso = fechaIngreso;
    notaCredito.monto = monto;
    notaCredito.monto_nc = monto_nc;
    notaCredito.monto_diferencia = monto_diferencia;

    await notaCredito.save();

    res.json({ msg: "Nota de crédito actualizada con éxito", notaCredito });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};

// Eliminar una nota de crédito
exports.deleteNotaCredito = async (req, res) => {
  const { id } = req.params;

  try {
    const notaCredito = await NotaCredito.findById(id);

    if (!notaCredito) {
      return res.status(404).json({ msg: 'Nota de crédito no encontrada' });
    }

    await notaCredito.remove();

    res.json({ msg: "Nota de crédito eliminada con éxito" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error del servidor");
  }
};
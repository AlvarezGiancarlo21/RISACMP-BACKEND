
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const Clientes = require('../models/Clientes');

function generateClienteCode() {
    const codeLength = 8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
  
    for (let i = 0; i < codeLength; i++) {
      const charIndex = Math.floor(Math.random() * characters.length);
      code += characters[charIndex];
    }
  
    return code;
  }

exports.registerClientes = async (req, res) => {
  const { codigoCliente, nombres, apellidos, ruc, telefono, direccion } = req.body;

  try {
    let clientes = await Clientes.findOne({ ruc });

    if (clientes) {
      return res.status(400).json({ msg: 'El RUC ya existe' });
    }

    const codigoCliente = generateClienteCode();

    clientes = new Clientes({
      codigoCliente,
      nombres,
      apellidos,
      ruc,
      telefono,
      direccion,
    });

    await clientes.save();

    res.json({ msg: 'El cliente ha sido creado exitosamente' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getAllClientes = async (req, res) => {
    try {
        const clientes = await Clientes.find();
        res.json(clientes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

exports.exportClientesToExcel = async (req, res) => {
    try {
        const clientes = await Clientes.find();
        
        // Crear un nuevo workbook de Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Clientes');
        
        // Definir las cabeceras de las columnas
        worksheet.columns = [
            { header: 'Codigo Cliente', key: 'codigoCliente', width: 20 },
            { header: 'Nombres', key: 'nombres', width: 30 },
            { header: 'Apellidos', key: 'apellidos', width: 30 },
            { header: 'RUC', key: 'ruc', width: 20 },
            { header: 'Telefono', key: 'telefono', width: 15 },
            { header: 'Direccion', key: 'direccion', width: 30 }
        ];

        // Agregar los datos de los proveedores al worksheet
        clientes.forEach(clientes => {
            worksheet.addRow(clientes.toObject());
        });

        // Generar el archivo Excel
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="clientes.xlsx"');

        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};
exports.exportClientesToPDF = async (req, res) => {
    try {
        const clientes = await Clientes.find();
        
        // Crear un nuevo documento PDF
        const doc = new PDFDocument();

        // Configurar la respuesta HTTP con el tipo de contenido
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="clientes.pdf"');

        // Pipe el documento PDF directamente a la respuesta HTTP
        doc.pipe(res);

        // Agregar contenido al documento PDF
        doc.fontSize(20).text('Lista de clientes', { align: 'center' });
        doc.moveDown();

        clientes.forEach(clientes => {
            doc.fontSize(12).text(`Codigo Cliente: ${clientes.codigoCliente}`);
            doc.fontSize(12).text(`Nombres: ${clientes.nombres}`);
            doc.fontSize(12).text(`Apellidos: ${clientes.apellidos}`);
            doc.fontSize(12).text(`RUC: ${clientes.ruc}`);
            doc.fontSize(12).text(`Telefono: ${clientes.telefono}`);
            doc.fontSize(12).text(`Direccion: ${clientes.direccion}`);
            doc.moveDown();
        });

        // Finaliza el documento PDF
        doc.end();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};
exports.updateClientesById = async (req, res) => {
    const { id } = req.params;
    const { codigoCliente, nombres, apellidos, ruc, telefono, direccion } = req.body;

    try {
        let clientes = await Clientes.findById(id);

        if (!clientes) {
            return res.status(404).json({ msg: 'Cliente no encontrado' });
        }

        clientes.codigoCliente = codigoCliente || clientes.codigoCliente;
        clientes.nombres = nombres || clientes.nombres;
        clientes.apellidos = apellidos || clientes.apellidos;
        clientes.ruc = ruc || clientes.ruc;
        clientes.telefono = telefono || clientes.telefono;
        clientes.direccion = direccion || clientes.direccion;

        await clientes.save();

        res.json({ msg: 'Cliente actualizado exitosamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

exports.deleteClientesById = async (req, res) => {
    const { id } = req.params;

    try {
        let clientes = await Clientes.findById(id);

        if (!clientes) {
            return res.status(404).json({ msg: 'Cliente no encontrado' });
        }

        // En lugar de eliminar, actualizamos el campo "activo" a false
        clientes.activo = false;
        await clientes.save();

        res.json({ msg: 'Cliente desactivado exitosamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

exports.getClientesById = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar cliente por codigoCliente, ruc o nombre
        const cliente = await Clientes.findOne({
            $or: [
                { codigoCliente: id },
                { ruc: id },
                {
                    $or: [
                        { nombres: id },
                        { apellidos: id },
                    ]
                }
            ]
        });

        if (!cliente) {
            return res.status(404).json({ msg: 'Cliente no encontrado' });
        }

        res.json(cliente);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};
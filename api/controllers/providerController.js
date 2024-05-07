const Provider = require('../models/Provider');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const fs = require('fs');
exports.registerProvider = async (req, res) => {
  const { ruc, razonSocial, direccion, telefono, lugarProcedencia } = req.body;

  try {
    let provider = await Provider.findOne({ ruc });

    if (provider) {
      return res.status(400).json({ msg: 'Provider already exists' });
    }

    provider = new Provider({
      ruc,
      razonSocial,
      direccion,
      telefono,
      lugarProcedencia,
    });

    await provider.save();

    res.json({ msg: 'Provider registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getAllProviders = async (req, res) => {
    try {
        const providers = await Provider.find();
        res.json(providers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

exports.exportProvidersToExcel = async (req, res) => {
    try {
        const providers = await Provider.find();
        
        // Crear un nuevo workbook de Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Proveedores');
        
        // Definir las cabeceras de las columnas
        worksheet.columns = [
            { header: 'RUC', key: 'ruc', width: 15 },
            { header: 'Razón Social', key: 'razonSocial', width: 30 },
            { header: 'Dirección', key: 'direccion', width: 30 },
            { header: 'Teléfono', key: 'telefono', width: 15 },
            { header: 'Lugar de Procedencia', key: 'lugarProcedencia', width: 30 }
        ];

        // Agregar los datos de los proveedores al worksheet
        providers.forEach(provider => {
            worksheet.addRow(provider.toObject());
        });

        // Generar el archivo Excel
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="proveedores.xlsx"');

        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};
exports.exportProvidersToPDF = async (req, res) => {
    try {
        const providers = await Provider.find();
        
        // Crear un nuevo documento PDF
        const doc = new PDFDocument();

        // Configurar la respuesta HTTP con el tipo de contenido
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="proveedores.pdf"');

        // Pipe el documento PDF directamente a la respuesta HTTP
        doc.pipe(res);

        // Agregar contenido al documento PDF
        doc.fontSize(20).text('Lista de Proveedores', { align: 'center' });
        doc.moveDown();

        providers.forEach(provider => {
            doc.fontSize(12).text(`RUC: ${provider.ruc}`);
            doc.fontSize(12).text(`Razón Social: ${provider.razonSocial}`);
            doc.fontSize(12).text(`Dirección: ${provider.direccion}`);
            doc.fontSize(12).text(`Teléfono: ${provider.telefono}`);
            doc.fontSize(12).text(`Lugar de Procedencia: ${provider.lugarProcedencia}`);
            doc.moveDown();
        });

        // Finaliza el documento PDF
        doc.end();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};
exports.updateProviderById = async (req, res) => {
    const { id } = req.params;
    const { ruc, razonSocial, direccion, telefono, lugarProcedencia } = req.body;

    try {
        let provider = await Provider.findById(id);

        if (!provider) {
            return res.status(404).json({ msg: 'Proveedor no encontrado' });
        }

        provider.ruc = ruc || provider.ruc;
        provider.razonSocial = razonSocial || provider.razonSocial;
        provider.direccion = direccion || provider.direccion;
        provider.telefono = telefono || provider.telefono;
        provider.lugarProcedencia = lugarProcedencia || provider.lugarProcedencia;

        await provider.save();

        res.json({ msg: 'Proveedor actualizado exitosamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

exports.deleteProviderById = async (req, res) => {
    const { id } = req.params;

    try {
        let provider = await Provider.findById(id);

        if (!provider) {
            return res.status(404).json({ msg: 'Proveedor no encontrado' });
        }

        await Provider.findByIdAndDelete(id);

        res.json({ msg: 'Proveedor eliminado exitosamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

exports.getProviderById = async (req, res) => {
    const { id } = req.params;

    try {
        const provider = await Provider.findById(id);

        if (!provider) {
            return res.status(404).json({ msg: 'Proveedor no encontrado' });
        }

        res.json(provider);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};